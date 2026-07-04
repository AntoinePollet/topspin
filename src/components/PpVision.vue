<script setup lang="ts">
import { Dumbbell, SlidersHorizontal, Swords } from '@lucide/vue'

const roadmap = [
  {
    phase: 'Bientôt',
    icon: SlidersHorizontal,
    title: 'Configurateur de raquette',
    text: 'Un questionnaire guidé (style de jeu, niveau, contraintes, budget) qui te recommande des combinaisons bois + revêtements adaptées à ton jeu.',
  },
  {
    phase: 'Bientôt',
    icon: Dumbbell,
    title: 'Bibliothèque d\'exercices',
    text: 'Des exercices d\'entraînement ciblés selon les points faibles que tu identifies — pour progresser sur ce qui compte vraiment pour toi.',
  },
  {
    phase: 'Plus tard',
    icon: Swords,
    title: 'Défis entre amis & club',
    text: 'Défie tes potes et tes coéquipiers dans l\'esprit de Freeping, mais couplé à tes vraies données de classement et de progression.',
  },
]
</script>

<template>
  <section id="vision" class="py-20 md:py-28 border-t border-white/5 relative overflow-hidden">
    <div class="absolute -right-40 top-0 h-80 w-80 rounded-full bg-secondary/10 blur-[120px]" />

    <div class="container relative mx-auto px-4">
      <div class="max-w-2xl mb-14">
        <p class="text-sm font-semibold uppercase tracking-widest text-accent sans-serif-text">
          La vision
        </p>
        <h2 class="title-text text-3xl md:text-4xl font-bold mt-3">
          On ne s'arrête pas aux stats.
        </h2>
        <p class="description-text mt-4 text-base-content/60 leading-relaxed">
          Voici où on veut emmener Topspin. Une feuille de route, pas des promesses
          gravées dans le marbre — et la bêta aide à décider quoi construire en premier.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <div
          v-for="(r, i) in roadmap"
          :key="i"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 120 } }"
          class="rounded-2xl border border-white/10 bg-base-200/50 p-6 relative"
        >
          <span class="inline-block rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[11px] uppercase tracking-wide text-base-content/50 sans-serif-text mb-4">
            {{ r.phase }}
          </span>
          <div class="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <component :is="r.icon" class="h-5 w-5" :stroke-width="2" />
          </div>
          <h3 class="title-text text-lg font-semibold mb-2">
            {{ r.title }}
          </h3>
          <p class="description-text text-sm text-base-content/60 leading-relaxed">
            {{ r.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
