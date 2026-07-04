<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Valeurs à tracer (ex. points de classement au fil des mois). */
  values: number[]
  /** Couleur de trait principale (CSS). */
  stroke?: string
  /** Hauteur du viewBox. */
  height?: number
  /** Afficher les points sur la courbe. */
  dots?: boolean
}>(), {
  stroke: '#ff5c35',
  height: 220,
  dots: true,
})

const W = 600
const PAD = 16

const H = computed(() => props.height)

const min = computed(() => Math.min(...props.values))
const max = computed(() => Math.max(...props.values))

function x(i: number): number {
  const n = props.values.length - 1 || 1
  return PAD + (i / n) * (W - PAD * 2)
}
function y(v: number): number {
  const range = max.value - min.value || 1
  const top = PAD
  const bottom = H.value - PAD
  return bottom - ((v - min.value) / range) * (bottom - top)
}

const points = computed(() => props.values.map((v, i) => ({ cx: x(i), cy: y(v) })))

const linePath = computed(() =>
  props.values.map((v, i) => `${i === 0 ? 'M' : 'L'} ${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' '),
)

const areaPath = computed(() =>
  `${linePath.value} L ${x(props.values.length - 1).toFixed(1)} ${H.value - PAD} L ${PAD} ${H.value - PAD} Z`,
)

// Approximation de la longueur du tracé pour l'animation dash-in.
const dashLen = computed(() => (W - PAD * 2) * 1.4)
const gradId = computed(() => `ppline-${props.stroke.replace(/[^a-z0-9]/gi, '')}`)
</script>

<template>
  <svg
    :viewBox="`0 0 ${W} ${H}`"
    class="w-full h-auto overflow-visible"
    preserveAspectRatio="none"
    role="img"
    aria-label="Courbe de progression du classement"
  >
    <defs>
      <linearGradient :id="gradId" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" :stop-color="stroke" stop-opacity="0.35" />
        <stop offset="100%" :stop-color="stroke" stop-opacity="0" />
      </linearGradient>
    </defs>

    <!-- Aire sous la courbe -->
    <path :d="areaPath" :fill="`url(#${gradId})`" opacity="0.9" />

    <!-- Trait animé -->
    <path
      :d="linePath"
      fill="none"
      :stroke="stroke"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      :style="{ '--dash-len': dashLen, 'strokeDasharray': dashLen, 'animation': 'dash-in 1.6s ease-out forwards' }"
    />

    <!-- Points -->
    <template v-if="dots">
      <circle
        v-for="(p, i) in points"
        :key="i"
        :cx="p.cx"
        :cy="p.cy"
        r="4"
        :fill="stroke"
        stroke="#0b0f17"
        stroke-width="2"
      />
    </template>
  </svg>
</template>
