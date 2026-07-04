<script setup lang="ts">
import { SearchX } from '@lucide/vue'

useHead({
  title: 'Page introuvable — Topspin',
  meta: [{ name: 'robots', content: 'noindex' }],
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">
    <div class="absolute inset-0 bg-grid opacity-50" />
    <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" />

    <div class="relative">
      <div class="mb-4 flex justify-center">
        <SearchX class="h-14 w-14 text-primary" :stroke-width="1.5" />
      </div>
      <p class="title-text text-7xl font-bold text-gradient">
        404
      </p>
      <h1 class="title-text text-2xl font-semibold mt-4">
        Balle hors de la table.
      </h1>
      <p class="description-text mt-3 text-base-content/60 max-w-sm mx-auto">
        Cette page n'existe pas (ou plus). Retourne à l'échauffement.
      </p>
      <RouterLink to="/" class="btn btn-primary rounded-full px-6 mt-8 font-semibold">
        Revenir à l'accueil
      </RouterLink>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: 404
</route>
