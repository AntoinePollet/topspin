<script setup lang="ts">
defineOptions({
  name: 'IndexPage',
})

useHead({
  title: 'Pong Ping — Ton classement, enfin beau et vivant',
})
</script>

<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <PpNav />
    <PpHero />
    <PpProblem />
    <PpProgression />
    <PpTournois />
    <PpVision />
    <PpWaitlist />
    <PpFooter />
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>
