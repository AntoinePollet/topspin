<script setup lang="ts">
// Données de démonstration fictives.
const seasonPoints = [720, 760, 745, 810, 855, 900, 940, 985, 1030, 1075, 1130, 1189]
const matchesByMonth = [
  { label: 'Sep', value: 6 },
  { label: 'Oct', value: 9 },
  { label: 'Nov', value: 12 },
  { label: 'Déc', value: 7 },
  { label: 'Jan', value: 14 },
  { label: 'Fév', value: 11 },
]

const features = [
  'Courbe de classement sur toutes tes saisons, pas juste le dernier chiffre.',
  'Historique de chaque match : adversaire, points gagnés/perdus, tendance.',
  'Objectifs et projections : à quel rythme tu montes, quand tu passes un palier.',
]
</script>

<template>
  <section id="progression" class="py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
    <div class="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]" />

    <div class="container relative mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 items-center">
        <!-- Texte -->
        <div
          v-motion
          :initial="{ opacity: 0, x: -24 }"
          :visible-once="{ opacity: 1, x: 0, transition: { duration: 500 } }"
        >
          <p class="text-sm font-semibold uppercase tracking-widest text-primary sans-serif-text">
            Progression
          </p>
          <h2 class="title-text text-3xl md:text-4xl font-bold mt-3">
            Vois ta progression comme jamais avant.
          </h2>
          <p class="description-text mt-4 text-base-content/60 leading-relaxed">
            Chaque point compte, mais c'est la tendance qui raconte ton histoire.
            Pong Ping reconstruit ta trajectoire complète et la rend limpide.
          </p>

          <ul class="mt-8 space-y-4">
            <li v-for="(f, i) in features" :key="i" class="flex gap-3">
              <span class="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary text-xs">✓</span>
              <span class="description-text text-sm text-base-content/80">{{ f }}</span>
            </li>
          </ul>
        </div>

        <!-- Charts -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 600, delay: 100 } }"
          class="space-y-4"
        >
          <div class="rounded-2xl border border-white/10 bg-base-200/70 p-5">
            <div class="flex items-center justify-between mb-4">
              <p class="text-sm font-semibold text-base-content/80 sans-serif-text">
                Évolution du classement
              </p>
              <span class="text-xs text-secondary sans-serif-text">saison en cours</span>
            </div>
            <PpLineChart :values="seasonPoints" stroke="#ff5c35" :height="180" />
          </div>

          <div class="rounded-2xl border border-white/10 bg-base-200/70 p-5">
            <p class="text-sm font-semibold text-base-content/80 sans-serif-text mb-4">
              Matchs joués par mois
            </p>
            <PpBarChart :data="matchesByMonth" color="#34e5c6" />
          </div>
          <p class="text-center text-[11px] text-base-content/30 sans-serif-text">
            Données fictives de démonstration
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
