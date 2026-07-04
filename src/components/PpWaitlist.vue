<script setup lang="ts">
import { PartyPopper } from '@lucide/vue'
import { onMounted, ref } from 'vue'

const count = ref<number | null>(null)

const email = ref('')
const level = ref('')
const consent = ref(false)
const website = ref('') // honeypot
const status = ref<'idle' | 'loading' | 'success' | 'error'>('idle')
const errorMsg = ref('')

onMounted(async () => {
  try {
    const res = await fetch('/api/count')
    if (res.ok) {
      const data = await res.json() as { count?: number }
      if (typeof data.count === 'number')
        count.value = data.count
    }
  }
  catch {
    // Silencieux : le compteur est un bonus, pas bloquant.
  }
})

// Après une inscription réussie, on reflète l'ajout tout de suite.
function bumpCount() {
  if (typeof count.value === 'number')
    count.value += 1
}

const levels = [
  { value: '', label: 'Ton niveau (optionnel)' },
  { value: 'non-classe', label: 'Non classé / débutant' },
  { value: '500-899', label: '500 – 899 pts' },
  { value: '900-1299', label: '900 – 1299 pts' },
  { value: '1300+', label: '1300 pts et +' },
]

async function submit() {
  errorMsg.value = ''
  if (!/^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/.test(email.value)) {
    errorMsg.value = 'Merci d\'entrer une adresse email valide.'
    return
  }
  if (!consent.value) {
    errorMsg.value = 'Merci d\'accepter la politique de confidentialité.'
    return
  }

  status.value = 'loading'
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value.trim(),
        level: level.value || null,
        website: website.value,
      }),
    })
    if (!res.ok) {
      const data = await res.json().catch(() => ({})) as { error?: string }
      throw new Error(data.error || 'Une erreur est survenue.')
    }
    status.value = 'success'
    bumpCount()
  }
  catch (err) {
    status.value = 'error'
    errorMsg.value = err instanceof Error ? err.message : 'Une erreur est survenue.'
  }
}
</script>

<template>
  <section id="waitlist" class="py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-40" />
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-96 w-96 rounded-full bg-primary/20 blur-[130px]" />

    <div class="container relative mx-auto px-4">
      <div class="max-w-xl mx-auto text-center">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary sans-serif-text">
          Accès anticipé
        </p>
        <h2 class="title-text text-3xl md:text-4xl font-bold mt-3">
          Sois parmi les premiers à tester Topspin.
        </h2>
        <p class="description-text mt-4 text-base-content/60">
          Laisse ton email : tu auras un accès gratuit à la bêta dès son ouverture,
          et ta voix comptera dans ce qu'on construit en premier.
        </p>

        <!-- Social proof : nombre d'inscrits (offset + inscriptions KV réelles) -->
        <div
          v-if="count !== null"
          class="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-base-200/60 px-4 py-1.5"
        >
          <span class="relative flex h-2 w-2">
            <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary/70" />
            <span class="relative inline-flex h-2 w-2 rounded-full bg-primary" />
          </span>
          <span class="text-sm text-base-content/70 sans-serif-text">
            Déjà <span class="font-semibold text-base-content">{{ count.toLocaleString('fr-FR') }}</span> pongistes sur la liste d'attente
          </span>
        </div>

        <!-- Succès -->
        <div
          v-if="status === 'success'"
          class="mt-8 rounded-2xl border border-success/30 bg-success/10 p-8"
        >
          <div class="mb-3 flex justify-center">
            <span class="flex h-14 w-14 items-center justify-center rounded-2xl bg-success/15 text-success"><PartyPopper class="h-7 w-7" /></span>
          </div>
          <h3 class="title-text text-xl font-semibold text-base-content">
            Tu es sur la liste !
          </h3>
          <p class="description-text mt-2 text-sm text-base-content/60">
            On te prévient dès que la bêta ouvre. À très vite sur les tables.
          </p>
        </div>

        <!-- Formulaire -->
        <form v-else class="mt-8 text-left" novalidate @submit.prevent="submit">
          <!-- Honeypot -->
          <input
            v-model="website"
            type="text"
            name="website"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            class="absolute -left-[9999px] h-0 w-0 opacity-0"
          >

          <div class="flex flex-col sm:flex-row gap-3">
            <input
              v-model="email"
              type="email"
              required
              placeholder="ton@email.fr"
              class="input input-bordered flex-1 bg-base-200/70 border-white/10 rounded-full focus:border-primary"
              :disabled="status === 'loading'"
            >
            <select
              v-model="level"
              class="select select-bordered bg-base-200/70 border-white/10 rounded-full text-base-content/80"
              :disabled="status === 'loading'"
            >
              <option v-for="l in levels" :key="l.value" :value="l.value">
                {{ l.label }}
              </option>
            </select>
          </div>

          <label class="mt-4 flex items-start gap-2.5 cursor-pointer">
            <input v-model="consent" type="checkbox" class="checkbox checkbox-sm checkbox-primary mt-0.5">
            <span class="text-xs text-base-content/50 sans-serif-text leading-relaxed">
              J'accepte que mon email soit utilisé pour être informé du lancement de Topspin,
              conformément à la
              <RouterLink to="/politique-confidentialite" class="text-primary hover:underline">politique de confidentialité</RouterLink>.
              Désinscription possible à tout moment.
            </span>
          </label>

          <p v-if="errorMsg" class="mt-3 text-sm text-error sans-serif-text">
            {{ errorMsg }}
          </p>

          <button
            type="submit"
            class="btn btn-primary w-full mt-5 rounded-full font-semibold shadow-[0_0_28px_-6px_rgba(255,92,53,0.7)]"
            :disabled="status === 'loading'"
          >
            <span v-if="status === 'loading'" class="loading loading-spinner loading-sm" />
            {{ status === 'loading' ? 'Envoi…' : 'Rejoindre la bêta gratuite' }}
          </button>
          <p class="mt-3 text-center text-xs text-base-content/30 sans-serif-text">
            Gratuit · sans engagement · pas de spam
          </p>
        </form>
      </div>
    </div>
  </section>
</template>
