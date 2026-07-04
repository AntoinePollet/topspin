<script setup lang="ts">
import { CalendarDays, MapPin } from '@lucide/vue'

// Tournois fictifs de démonstration.
const filters = ['Tous', 'Ce week-end', '< 30 km', 'Mon niveau', 'Régional']
const tournois = [
  { name: 'Open de Vincennes', date: 'Sam. 12 oct.', place: 'Vincennes (94)', dist: '8 km', level: 'Toutes séries', tag: 'Ce week-end' },
  { name: 'Tournoi National B', date: 'Dim. 20 oct.', place: 'Créteil (94)', dist: '14 km', level: '1000–1500', tag: 'Mon niveau' },
  { name: 'Critérium Fédéral', date: 'Sam. 9 nov.', place: 'Nanterre (92)', dist: '22 km', level: 'Régional', tag: 'Régional' },
  { name: 'Open Jeunes & Adultes', date: 'Dim. 17 nov.', place: 'Montreuil (93)', dist: '11 km', level: 'Toutes séries', tag: '< 30 km' },
]
</script>

<template>
  <section id="tournois" class="py-20 md:py-28 border-t border-white/5">
    <div class="container mx-auto px-4">
      <div class="max-w-2xl mb-12">
        <p class="text-sm font-semibold uppercase tracking-widest text-secondary sans-serif-text">
          Tournois
        </p>
        <h2 class="title-text text-3xl md:text-4xl font-bold mt-3">
          Tous les tournois de l'année, au même endroit.
        </h2>
        <p class="description-text mt-4 text-base-content/60 leading-relaxed">
          Fini la chasse au PDF. Filtre par date, distance et niveau, et repère
          en un instant les tournois faits pour toi.
        </p>
      </div>

      <!-- Filtres (démo visuelle) -->
      <div class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="(f, i) in filters"
          :key="f"
          class="rounded-full px-3.5 py-1.5 text-sm sans-serif-text border transition-colors"
          :class="i === 0
            ? 'bg-primary text-primary-content border-primary font-semibold'
            : 'border-white/10 text-base-content/60 bg-white/5'"
        >
          {{ f }}
        </span>
      </div>

      <!-- Liste -->
      <div class="grid sm:grid-cols-2 gap-4">
        <div
          v-for="(t, i) in tournois"
          :key="t.name"
          v-motion
          :initial="{ opacity: 0, y: 20 }"
          :visible-once="{ opacity: 1, y: 0, transition: { duration: 400, delay: i * 90 } }"
          class="group rounded-2xl border border-white/10 bg-base-200/50 p-5 hover:border-primary/40 transition-colors"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h3 class="title-text text-lg font-semibold">
                {{ t.name }}
              </h3>
              <p class="text-sm text-base-content/60 sans-serif-text mt-1">
                {{ t.place }} · {{ t.level }}
              </p>
            </div>
            <span class="shrink-0 rounded-lg bg-white/5 px-2.5 py-1 text-xs text-accent sans-serif-text">{{ t.tag }}</span>
          </div>
          <div class="mt-4 flex items-center justify-between text-sm">
            <span class="inline-flex items-center gap-1.5 text-base-content/80 font-medium sans-serif-text"><CalendarDays class="h-4 w-4 text-primary" /> {{ t.date }}</span>
            <span class="inline-flex items-center gap-1.5 text-base-content/50 sans-serif-text"><MapPin class="h-4 w-4" /> {{ t.dist }}</span>
          </div>
        </div>
      </div>
      <p class="mt-6 text-[11px] text-base-content/30 sans-serif-text">
        Exemples fictifs de démonstration.
      </p>
    </div>
  </section>
</template>
