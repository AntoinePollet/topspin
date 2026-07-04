<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Séries de barres { label, value }. */
  data: { label: string, value: number }[]
  color?: string
}>(), {
  color: '#34e5c6',
})

const max = computed(() => Math.max(...props.data.map(d => d.value)) || 1)
</script>

<template>
  <div class="flex items-end justify-between gap-2 h-44">
    <div
      v-for="(d, i) in data"
      :key="i"
      class="flex-1 flex flex-col items-center justify-end h-full gap-2"
    >
      <div
        class="w-full rounded-t-md transition-all duration-700 ease-out"
        :style="{
          height: `${(d.value / max) * 100}%`,
          background: `linear-gradient(180deg, ${color} 0%, ${color}55 100%)`,
        }"
      />
      <span class="text-[10px] sm:text-xs text-base-content/50 sans-serif-text whitespace-nowrap">{{ d.label }}</span>
    </div>
  </div>
</template>
