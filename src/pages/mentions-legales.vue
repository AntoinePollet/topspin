<script setup lang="ts">
defineOptions({
  name: 'MentionsLegalesPage',
})

useHead({
  title: 'Mentions légales — Pong Ping',
  meta: [{ name: 'robots', content: 'noindex, follow' }],
  link: [{ rel: 'canonical', href: 'https://pongping.polletantoine.com/mentions-legales' }],
})
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-white/5">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5">
          <span class="h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_rgba(255,92,53,0.7)]" />
          <span class="text-lg font-bold title-text">Pong<span class="text-primary">Ping</span></span>
        </RouterLink>
        <RouterLink to="/" class="text-sm text-base-content/60 hover:text-primary sans-serif-text">
          ← Accueil
        </RouterLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-14 max-w-3xl">
      <h1 class="title-text text-3xl md:text-4xl font-bold mb-8">
        Mentions légales
      </h1>

      <div class="space-y-8 description-text text-base-content/80 leading-relaxed">
        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Éditeur du site
          </h2>
          <p>
            Le site <strong>Pong Ping</strong> (pongping.polletantoine.com) est un projet indépendant édité par
            Antoine Pollet, entrepreneur individuel.<br>
            Contact : <a href="mailto:pollet.antoine.alexis@gmail.com" class="text-primary hover:underline">pollet.antoine.alexis@gmail.com</a>
          </p>
          <p class="mt-2 text-sm text-base-content/50">
            [À compléter avant mise en ligne définitive : adresse postale, numéro SIREN/SIRET le cas échéant,
            et directeur de la publication.]
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Hébergement
          </h2>
          <p>
            Le site est hébergé par <strong>Cloudflare, Inc.</strong>, 101 Townsend Street, San Francisco,
            CA 94107, États-Unis — <a href="https://www.cloudflare.com" target="_blank" rel="noopener" class="text-primary hover:underline">cloudflare.com</a>.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Indépendance
          </h2>
          <p>
            Pong Ping est un projet indépendant, développé par des passionnés de tennis de table.
            Il n'est <strong>ni affilié, ni approuvé, ni sponsorisé par la Fédération Française de Tennis de Table (FFTT)</strong>
            ni par aucune autre institution. Les marques citées appartiennent à leurs détenteurs respectifs.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Propriété intellectuelle
          </h2>
          <p>
            L'ensemble des éléments du site (textes, visuels, interface, code) est protégé par le droit
            de la propriété intellectuelle. Toute reproduction non autorisée est interdite. Les données
            et visuels présentés à titre d'aperçu sont <strong>fictifs et fournis à des fins de démonstration</strong>.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Responsabilité
          </h2>
          <p>
            Pong Ping est en phase de préparation. Les fonctionnalités décrites relèvent d'une feuille de route
            et sont susceptibles d'évoluer. Aucune garantie n'est donnée quant à la disponibilité future du service.
          </p>
        </section>
      </div>
    </main>

    <PpFooter />
  </div>
</template>

<route lang="yaml">
meta:
  layout: default
</route>
