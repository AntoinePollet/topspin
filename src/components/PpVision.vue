<script setup lang="ts">
const roadmap = [
  {
    phase: 'Bientôt',
    icon: '🏓',
    title: 'Suivi d\'usure du matériel',
    text: 'Enregistre tes plaques et ton bois, et Pong Ping estime leur usure selon ton volume de jeu — pour savoir quand elles perdent en performance.',
  },
  {
    phase: 'Plus tard',
    icon: '🛒',
    title: 'Marketplace matériel',
    text: 'Achète plaques et bois au bon moment, avec des recommandations basées sur ton style de jeu et ton niveau.',
  },
  {
    phase: 'Plus tard',
    icon: '🔔',
    title: 'Rappels intelligents',
    text: 'Une notif quand il est temps de changer ta plaque, avant que ça se ressente sur tes résultats.',
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
          Voici où on veut emmener Pong Ping. Une feuille de route, pas des promesses
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
          <div class="text-3xl mb-3">
            {{ r.icon }}
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
