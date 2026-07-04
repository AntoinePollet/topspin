import { Resend } from 'resend'

interface KVNamespace {
  get: (key: string) => Promise<string | null>
  put: (key: string, value: string, options?: { metadata?: unknown }) => Promise<void>
}

interface Fetcher {
  fetch: (request: Request) => Promise<Response>
}

interface Env {
  ASSETS: Fetcher
  WAITLIST: KVNamespace
  RESEND_API_KEY?: string
  NOTIFY_EMAIL?: string
}

interface SubscribePayload {
  email: string
  level?: string | null
  website?: string // honeypot
}

// Adresse expéditrice : doit être un domaine vérifié dans Resend.
const FROM_EMAIL = 'Pong Ping <waitlist@polletantoine.com>'
// Destinataire des notifications d'inscription (override possible via env).
const DEFAULT_NOTIFY = 'pollet.antoine.alexis@gmail.com'

const LEVEL_LABELS: Record<string, string> = {
  'non-classe': 'Non classé / débutant',
  '500-899': '500 – 899 pts',
  '900-1299': '900 – 1299 pts',
  '1300+': '1300 pts et +',
}

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email) && email.length < 254
}

function validate(data: unknown): data is SubscribePayload {
  if (!data || typeof data !== 'object')
    return false
  const p = data as Record<string, unknown>
  return typeof p.email === 'string' && isValidEmail(p.email)
}

async function handleSubscribe(request: Request, env: Env): Promise<Response> {
  let payload: unknown
  try {
    payload = await request.json()
  }
  catch {
    return json({ error: 'Requête invalide.' }, 400)
  }

  if (!validate(payload))
    return json({ error: 'Adresse email invalide.' }, 400)

  // Honeypot : un humain ne remplit jamais ce champ. Faux succès si rempli.
  if (typeof payload.website === 'string' && payload.website.trim() !== '')
    return json({ success: true })

  const email = payload.email.trim().toLowerCase()
  const level = typeof payload.level === 'string' ? payload.level : null
  const key = `email:${email}`

  if (!env.WAITLIST) {
    console.error('Binding KV WAITLIST manquant')
    return json({ error: 'Service momentanément indisponible.' }, 500)
  }

  const existing = await env.WAITLIST.get(key)
  if (existing) {
    // Déjà inscrit : succès idempotent sans renotifier.
    return json({ success: true, alreadySubscribed: true })
  }

  const record = {
    email,
    level,
    createdAt: new Date().toISOString(),
    ua: request.headers.get('user-agent') ?? null,
    ref: request.headers.get('referer') ?? null,
  }

  await env.WAITLIST.put(key, JSON.stringify(record), { metadata: { level } })

  // Notification Resend (non bloquante : l'inscription est déjà enregistrée).
  if (env.RESEND_API_KEY) {
    try {
      const resend = new Resend(env.RESEND_API_KEY)
      const levelLabel = level ? (LEVEL_LABELS[level] ?? level) : '—'
      await resend.emails.send({
        from: FROM_EMAIL,
        to: env.NOTIFY_EMAIL || DEFAULT_NOTIFY,
        replyTo: email,
        subject: `🏓 Nouvelle inscription waitlist Pong Ping — ${email}`,
        html: `<div style="font-family:Inter,Arial,sans-serif;color:#1f2937">
          <h2 style="margin:0 0 12px">Nouvelle inscription à la bêta</h2>
          <p style="margin:4px 0"><strong>Email :</strong> ${email}</p>
          <p style="margin:4px 0"><strong>Niveau :</strong> ${levelLabel}</p>
          <p style="margin:16px 0 0;font-size:12px;color:#9ca3af">${record.createdAt}</p>
        </div>`,
      })
    }
    catch (err) {
      console.warn('Notification Resend échouée (non bloquant) :', err)
    }
  }

  return json({ success: true })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/subscribe') {
      if (request.method !== 'POST')
        return json({ error: 'Méthode non autorisée.' }, 405)
      return handleSubscribe(request, env)
    }

    // Tout le reste : servi par les assets statiques (SSG), avec repli 404.
    return env.ASSETS.fetch(request)
  },
}
