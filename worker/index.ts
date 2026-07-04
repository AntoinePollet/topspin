import { Resend } from 'resend'

interface KVListResult {
  keys: { name: string }[]
  list_complete: boolean
  cursor?: string
}

interface KVNamespace {
  get: (key: string) => Promise<string | null>
  put: (key: string, value: string, options?: { metadata?: unknown }) => Promise<void>
  list: (options?: { prefix?: string, limit?: number, cursor?: string }) => Promise<KVListResult>
}

interface Fetcher {
  fetch: (request: Request) => Promise<Response>
}

interface ExecutionContext {
  waitUntil: (promise: Promise<unknown>) => void
}

interface Env {
  ASSETS: Fetcher
  WAITLIST: KVNamespace
  RESEND_API_KEY?: string
  NOTIFY_EMAIL?: string
}

// Nombre de départ affiché : les vraies inscriptions KV s'ajoutent par-dessus.
const COUNT_BASE = 600

interface SubscribePayload {
  email: string
  level?: string | null
  website?: string // honeypot
}

// Adresse expéditrice : doit être un domaine vérifié dans Resend.
const FROM_EMAIL = 'Topspin <waitlist@polletantoine.com>'
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
        subject: `🏓 Nouvelle inscription waitlist Topspin — ${email}`,
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

// Compte les inscrits réels (clés `email:`), en paginant le KV.
async function countSubscribers(env: Env): Promise<number> {
  let total = 0
  let cursor: string | undefined
  do {
    const res = await env.WAITLIST.list({ prefix: 'email:', limit: 1000, cursor })
    total += res.keys.length
    cursor = res.list_complete ? undefined : res.cursor
  } while (cursor)
  return total
}

async function handleCount(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  if (!env.WAITLIST)
    return json({ count: COUNT_BASE })

  // Cache edge court : évite de lister le KV à chaque visite.
  // `caches.default` est spécifique aux Workers (absent des types DOM).
  const cache = (caches as unknown as { default: Cache }).default
  const cacheKey = new Request(new URL('/api/count', request.url).toString())
  const cached = await cache.match(cacheKey)
  if (cached)
    return cached

  const count = COUNT_BASE + await countSubscribers(env)
  const res = json({ count })
  res.headers.set('Cache-Control', 'public, max-age=60')
  ctx.waitUntil(cache.put(cacheKey, res.clone()))
  return res
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/subscribe') {
      if (request.method !== 'POST')
        return json({ error: 'Méthode non autorisée.' }, 405)
      return handleSubscribe(request, env)
    }

    if (url.pathname === '/api/count') {
      if (request.method !== 'GET')
        return json({ error: 'Méthode non autorisée.' }, 405)
      return handleCount(request, env, ctx)
    }

    // Tout le reste : servi par les assets statiques (SSG), avec repli 404.
    return env.ASSETS.fetch(request)
  },
}
