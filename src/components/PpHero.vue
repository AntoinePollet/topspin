<script setup lang="ts">
import { ArrowUp } from '@lucide/vue'

// Données de DÉMONSTRATION (fictives) — Topspin n'est pas encore connecté
// à l'API FFTT. Servent uniquement à illustrer l'interface.
const rankPoints = [982, 991, 1005, 998, 1024, 1051, 1043, 1078, 1102, 1135, 1121, 1189]

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el)
    window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}
</script>

<template>
  <section id="top" class="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
    <!-- Fond : grille + halos -->
    <div class="absolute inset-0 bg-grid opacity-60" />
    <div class="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-[120px]" />
    <div class="absolute top-20 -right-40 h-96 w-96 rounded-full bg-secondary/15 blur-[120px]" />

    <div class="container relative mx-auto px-4">
      <div class="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <!-- Texte -->
        <div v-motion :initial="{ opacity: 0, y: 24 }" :enter="{ opacity: 1, y: 0, transition: { duration: 500 } }">
          <div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-base-content/70 sans-serif-text mb-6">
            <span class="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            Tennis de table · projet indépendant · bêta
          </div>

          <h1 class="title-text text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.05]">
            Ton classement tennis de table,<br>
            <span class="text-gradient">enfin beau et vivant.</span>
          </h1>

          <p class="description-text mt-6 text-lg text-base-content/70 max-w-lg leading-relaxed">
            Topspin transforme ta vie de pongiste en un tableau de bord clair :
            courbe de progression, historique de classement, stats de matchs et
            calendrier des tournois. Tout ce que le suivi officiel ne montre pas.
          </p>

          <div class="mt-8 flex flex-col sm:flex-row gap-3">
            <button
              type="button"
              class="btn btn-primary rounded-full px-6 font-semibold shadow-[0_0_28px_-6px_rgba(255,92,53,0.7)]"
              @click="scrollTo('waitlist')"
            >
              Rejoindre la bêta gratuite
            </button>
            <button
              type="button"
              class="btn btn-ghost rounded-full px-6 border border-white/10"
              @click="scrollTo('progression')"
            >
              Voir un aperçu
            </button>
          </div>

          <p class="mt-4 text-xs text-base-content/40 sans-serif-text">
            Accès anticipé · gratuit · sans engagement
          </p>
        </div>

        <!-- Carte dashboard mock -->
        <div
          v-motion
          :initial="{ opacity: 0, y: 40, scale: 0.96 }"
          :enter="{ opacity: 1, y: 0, scale: 1, transition: { duration: 600, delay: 150 } }"
          class="relative"
        >
          <div class="rounded-2xl border border-white/10 bg-base-200/80 backdrop-blur p-5 sm:p-6 glow-primary">
            <div class="flex items-center justify-between mb-5">
              <div>
                <p class="text-xs text-base-content/50 sans-serif-text">
                  Classement officiel
                </p>
                <p class="title-text text-3xl font-bold text-base-content">
                  1189 <span class="text-base font-normal text-base-content/40">pts</span>
                </p>
              </div>
              <div class="inline-flex items-center gap-1 rounded-full bg-success/15 text-success px-2.5 py-1 text-sm font-semibold">
                <ArrowUp class="h-4 w-4" /> +207 <span class="hidden sm:inline text-xs font-normal">/ saison</span>
              </div>
            </div>

            <PpLineChart :values="rankPoints" stroke="#ff5c35" :height="200" />

            <div class="mt-5 grid grid-cols-3 gap-3">
              <div class="rounded-xl bg-white/5 p-3">
                <p class="text-xs text-base-content/50 sans-serif-text">
                  Victoires
                </p>
                <p class="title-text text-xl font-bold text-base-content">
                  68%
                </p>
              </div>
              <div class="rounded-xl bg-white/5 p-3">
                <p class="text-xs text-base-content/50 sans-serif-text">
                  Tournois
                </p>
                <p class="title-text text-xl font-bold text-base-content">
                  14
                </p>
              </div>
              <div class="rounded-xl bg-white/5 p-3">
                <p class="text-xs text-base-content/50 sans-serif-text">
                  Meilleure perf
                </p>
                <p class="title-text text-xl font-bold text-secondary">
                  +42
                </p>
              </div>
            </div>
          </div>
          <p class="mt-3 text-center text-[11px] text-base-content/30 sans-serif-text">
            Aperçu d'interface — données fictives de démonstration
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
