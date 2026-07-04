<script setup lang="ts">
const SITE_URL = 'https://pongping.polletantoine.com'
const OG_IMAGE = `${SITE_URL}/og-image.jpg`

useHead({
  title: 'Pong Ping — Ton classement FFTT, enfin beau et vivant',
  meta: [
    { name: 'description', content: 'Pong Ping suit ta progression au tennis de table : courbes de classement, historique, statistiques et calendrier des tournois. Un projet indépendant fait par des passionnés. Rejoins la bêta.' },
    { name: 'keywords', content: 'tennis de table, ping pong, classement, FFTT, progression, statistiques, tournois, pongiste, classement officiel' },
    { name: 'author', content: 'Pong Ping' },
    { name: 'robots', content: 'index, follow' },
    { name: 'language', content: 'fr' },

    // Open Graph
    { property: 'og:title', content: 'Pong Ping — Ton classement, enfin beau et vivant' },
    { property: 'og:description', content: 'Suis ta progression au tennis de table : courbes, historique, stats et tournois. Rejoins la bêta.' },
    { property: 'og:type', content: 'website' },
    { property: 'og:url', content: SITE_URL },
    { property: 'og:image', content: OG_IMAGE },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: 'Pong Ping — suivi de progression au tennis de table' },
    { property: 'og:locale', content: 'fr_FR' },
    { property: 'og:site_name', content: 'Pong Ping' },

    // Twitter Card
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: 'Pong Ping — Ton classement, enfin beau et vivant' },
    { name: 'twitter:description', content: 'Suis ta progression au tennis de table : courbes, historique, stats et tournois.' },
    { name: 'twitter:image', content: OG_IMAGE },

    { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
    { name: 'theme-color', content: '#0b0f17' },
    { name: 'msapplication-TileColor', content: '#0b0f17' },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
    { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
    { name: 'apple-mobile-web-app-title', content: 'Pong Ping' },
  ],
  link: [
    { rel: 'canonical', href: SITE_URL },
    { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
    { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/manifest.json' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
  ],
  htmlAttrs: {
    lang: 'fr',
  },
})
</script>

<template>
  <RouterView />
</template>
