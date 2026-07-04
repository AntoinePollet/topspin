<script setup lang="ts">
function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el)
    window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}
</script>

<template>
  <footer class="border-t border-white/5 bg-base-200/40">
    <div class="container mx-auto px-4 py-14">
      <div class="grid md:grid-cols-2 gap-10">
        <div>
          <div class="flex items-center gap-2.5 mb-4">
            <span class="relative flex h-8 w-8 items-center justify-center">
              <span class="h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_rgba(255,92,53,0.7)]" />
            </span>
            <span class="text-lg font-bold title-text">Pong<span class="text-primary">Ping</span></span>
          </div>
          <p class="description-text text-sm text-base-content/50 max-w-sm leading-relaxed">
            Le suivi de progression au tennis de table, enfin beau et clair.
            Un projet indépendant fait par des passionnés.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-10 md:justify-end">
          <div>
            <p class="text-xs uppercase tracking-widest text-base-content/40 sans-serif-text mb-3">
              Navigation
            </p>
            <ul class="space-y-2 text-sm">
              <li>
                <button type="button" class="text-base-content/70 hover:text-primary sans-serif-text" @click="scrollTo('progression')">
                  Progression
                </button>
              </li>
              <li>
                <button type="button" class="text-base-content/70 hover:text-primary sans-serif-text" @click="scrollTo('tournois')">
                  Tournois
                </button>
              </li>
              <li>
                <button type="button" class="text-base-content/70 hover:text-primary sans-serif-text" @click="scrollTo('vision')">
                  Vision
                </button>
              </li>
              <li>
                <button type="button" class="text-base-content/70 hover:text-primary sans-serif-text" @click="scrollTo('waitlist')">
                  Rejoindre la bêta
                </button>
              </li>
            </ul>
          </div>
          <div>
            <p class="text-xs uppercase tracking-widest text-base-content/40 sans-serif-text mb-3">
              Légal
            </p>
            <ul class="space-y-2 text-sm">
              <li>
                <RouterLink to="/mentions-legales" class="text-base-content/70 hover:text-primary sans-serif-text">
                  Mentions légales
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/politique-confidentialite" class="text-base-content/70 hover:text-primary sans-serif-text">
                  Confidentialité
                </RouterLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p class="text-xs text-base-content/40 sans-serif-text">
          © 2026 Pong Ping. Tous droits réservés.
        </p>
        <p class="text-xs text-base-content/30 sans-serif-text text-center sm:text-right">
          Projet indépendant, non affilié à la Fédération Française de Tennis de Table.
        </p>
      </div>
    </div>
  </footer>
</template>
