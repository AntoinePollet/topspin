<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const scrolled = ref(false)
const mobileOpen = ref(false)

const links = [
  { id: 'progression', label: 'Progression' },
  { id: 'tournois', label: 'Tournois' },
  { id: 'vision', label: 'Vision' },
]

function scrollTo(id: string) {
  mobileOpen.value = false
  const el = document.getElementById(id)
  if (el)
    window.scrollTo({ top: el.offsetTop - 72, behavior: 'smooth' })
}

function onScroll() {
  scrolled.value = window.scrollY > 24
}

onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header
    class="fixed top-0 inset-x-0 z-50 transition-all duration-300"
    :class="scrolled ? 'bg-base-100/80 backdrop-blur-md border-b border-white/5' : 'bg-transparent'"
  >
    <div class="container mx-auto px-4 h-16 flex items-center justify-between">
      <!-- Logo -->
      <button type="button" class="flex items-center gap-2.5 group" @click="scrollTo('top')">
        <span class="relative flex h-8 w-8 items-center justify-center">
          <span class="absolute inset-0 rounded-full bg-primary/20 blur-md group-hover:bg-primary/40 transition-colors" />
          <span class="relative h-4 w-4 rounded-full bg-primary shadow-[0_0_12px_rgba(255,92,53,0.7)]" />
        </span>
        <span class="text-lg font-bold title-text text-base-content">Pong<span class="text-primary">Ping</span></span>
      </button>

      <!-- Desktop nav -->
      <nav class="hidden md:flex items-center gap-1">
        <button
          v-for="l in links"
          :key="l.id"
          type="button"
          class="px-3 py-2 text-sm text-base-content/70 hover:text-base-content transition-colors sans-serif-text"
          @click="scrollTo(l.id)"
        >
          {{ l.label }}
        </button>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="btn btn-primary btn-sm rounded-full px-4 font-semibold shadow-[0_0_20px_-4px_rgba(255,92,53,0.6)]"
          @click="scrollTo('waitlist')"
        >
          Rejoindre la bêta
        </button>
        <button
          type="button"
          class="btn btn-ghost btn-sm btn-square md:hidden"
          aria-label="Menu"
          @click="mobileOpen = !mobileOpen"
        >
          <div class="i-carbon-menu text-xl">
            ☰
          </div>
        </button>
      </div>
    </div>

    <!-- Mobile links -->
    <div v-if="mobileOpen" class="md:hidden border-t border-white/5 bg-base-100/95 backdrop-blur-md">
      <nav class="container mx-auto px-4 py-3 flex flex-col">
        <button
          v-for="l in links"
          :key="l.id"
          type="button"
          class="text-left py-3 text-base-content/80 sans-serif-text border-b border-white/5 last:border-0"
          @click="scrollTo(l.id)"
        >
          {{ l.label }}
        </button>
      </nav>
    </div>
  </header>
</template>
