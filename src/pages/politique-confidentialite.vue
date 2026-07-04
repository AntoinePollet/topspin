<script setup lang="ts">
import { ArrowLeft } from '@lucide/vue'

defineOptions({
  name: 'PolitiqueConfidentialitePage',
})

useHead({
  title: 'Politique de confidentialité — Topspin',
  meta: [{ name: 'robots', content: 'noindex, follow' }],
  link: [{ rel: 'canonical', href: 'https://pongping.polletantoine.com/politique-confidentialite' }],
})
</script>

<template>
  <div class="min-h-screen">
    <header class="border-b border-white/5">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2.5">
          <span class="h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_rgba(255,92,53,0.7)]" />
          <span class="text-lg font-bold title-text">Top<span class="text-primary">spin</span></span>
        </RouterLink>
        <RouterLink to="/" class="inline-flex items-center gap-1.5 text-sm text-base-content/60 hover:text-primary sans-serif-text">
          <ArrowLeft class="h-4 w-4" /> Accueil
        </RouterLink>
      </div>
    </header>

    <main class="container mx-auto px-4 py-14 max-w-3xl">
      <h1 class="title-text text-3xl md:text-4xl font-bold mb-3">
        Politique de confidentialité
      </h1>
      <p class="text-sm text-base-content/50 mb-8 sans-serif-text">
        Dernière mise à jour : juillet 2026
      </p>

      <div class="space-y-8 description-text text-base-content/80 leading-relaxed">
        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Responsable du traitement
          </h2>
          <p>
            Les données collectées sur ce site sont traitées par Antoine Pollet (Topspin), éditeur du site.
            Contact : <a href="mailto:pollet.antoine.alexis@gmail.com" class="text-primary hover:underline">pollet.antoine.alexis@gmail.com</a>.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Données collectées
          </h2>
          <p>
            Via le formulaire d'inscription à la liste d'attente, nous collectons :
          </p>
          <ul class="list-disc list-inside mt-2 space-y-1">
            <li>votre <strong>adresse email</strong> (obligatoire) ;</li>
            <li>votre <strong>niveau/classement approximatif</strong> (facultatif).</li>
          </ul>
          <p class="mt-2">
            Aucune donnée sensible n'est demandée. Nous ne collectons pas votre numéro de licence FFTT.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Finalité et base légale
          </h2>
          <p>
            Ces données servent uniquement à vous informer du lancement de Topspin et à mesurer l'intérêt
            pour le projet. Le traitement repose sur votre <strong>consentement</strong>, recueilli lors de l'inscription.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Conservation
          </h2>
          <p>
            Vos données sont conservées jusqu'au lancement du service, puis au maximum 24 mois après votre
            dernière interaction, ou jusqu'à votre demande de suppression.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Hébergement et sous-traitants
          </h2>
          <p>
            Les données sont stockées sur l'infrastructure de <strong>Cloudflare</strong> (Cloudflare Workers KV).
            L'envoi des notifications d'inscription est assuré par <strong>Resend</strong>. Ces prestataires
            agissent en qualité de sous-traitants.
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Vos droits
          </h2>
          <p>
            Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement, d'opposition
            et de portabilité de vos données. Pour l'exercer, écrivez à
            <a href="mailto:pollet.antoine.alexis@gmail.com" class="text-primary hover:underline">pollet.antoine.alexis@gmail.com</a>.
            Vous pouvez également introduire une réclamation auprès de la CNIL (<a href="https://www.cnil.fr" target="_blank" rel="noopener" class="text-primary hover:underline">cnil.fr</a>).
          </p>
        </section>

        <section>
          <h2 class="title-text text-xl font-semibold text-base-content mb-2">
            Cookies
          </h2>
          <p>
            Ce site ne dépose pas de cookie publicitaire ni de traceur tiers. Seuls des éléments techniques
            strictement nécessaires au fonctionnement peuvent être utilisés.
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
