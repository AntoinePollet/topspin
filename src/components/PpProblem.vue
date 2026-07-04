<script setup lang="ts">
import { EyeOff, FileStack, TrendingDown } from '@lucide/vue'

const pains = [
  {
    icon: TrendingDown,
    title: 'Un classement figé, illisible',
    text: 'Un chiffre brut, mis à jour en différé, sans contexte. Impossible de voir d\'un coup d\'œil si tu progresses vraiment.',
  },
  {
    icon: EyeOff,
    title: 'Aucun historique visuel',
    text: 'Ta progression sur 3 saisons ? Des tableaux austères à recouper à la main. Ta courbe n\'existe nulle part.',
  },
  {
    icon: FileStack,
    title: 'Des tournois éparpillés',
    text: 'PDF, sites de clubs, groupes Facebook… Trouver les tournois près de chez toi relève de l\'enquête.',
  },
]
</script>

<template>
  <section class="py-20 md:py-28 border-t border-white/5">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mx-auto text-center mb-14">
        <p class="text-sm font-semibold uppercase tracking-widest text-primary sans-serif-text">
          Le constat
        </p>
        <h2 class="title-text text-3xl md:text-4xl font-bold mt-3">
          Suivre sa progression au ping,<br>c'est aujourd'hui pénible.
        </h2>
        <p class="description-text mt-4 text-base-content/60">
          Les données existent — elles sont juste mal montrées. Topspin repart de zéro sur l'expérience.
        </p>
      </div>

      <div class="grid md:grid-cols-3 gap-5">
        <div
          v-for="(p, i) in pains"
          :key="i"
          v-motion
          :initial="{ opacity: 0, y: 24 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 450, delay: i * 120 } }"
          class="rounded-2xl border border-white/10 bg-base-200/50 p-6"
        >
          <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <component :is="p.icon" class="h-5 w-5" :stroke-width="2" />
          </div>
          <h3 class="title-text text-lg font-semibold mb-2">
            {{ p.title }}
          </h3>
          <p class="description-text text-sm text-base-content/60 leading-relaxed">
            {{ p.text }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
