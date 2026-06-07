<template>
  <div class="w-full flex flex-col items-center">
    <div
      :class="[
        'w-full mb-6 px-4 py-3.5 rounded-xl border font-semibold text-center tracking-wide shadow-inner text-sm transition-all duration-300',
        props.phaseBannerClass,
      ]"
    >
      {{ props.phaseMessage }}
    </div>

    <div
      class="w-full max-w-md aspect-square bg-slate-950 p-4 rounded-2xl border border-slate-800 flex items-center justify-center shadow-2xl"
    >
      <div
        class="grid gap-2 w-full h-full"
        :style="{
          gridTemplateColumns: `repeat(${props.gridSize}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${props.gridSize}, minmax(0, 1fr))`,
          gridGap: '10px',
        }"
      >
        <Cell
          v-for="(cell, idx) in flattenedGrid"
          :key="idx"
          :cell="cell"
          :disabled="
            props.phase !== 'dandelion' ||
            props.gameOver ||
            cell.type === 'flower'
          "
          @cell-click="emit('cell-click', cell.row, cell.col)"
        />
      </div>
    </div>

    <div
      class="w-full mt-6 grid grid-cols-2 gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-700/40 text-xs font-semibold"
    >
      <div class="flex flex-col gap-1">
        <span class="text-slate-400 font-medium">MEADOW COVERAGE RATE</span>
        <div class="flex items-center gap-2 mt-1">
          <div
            class="w-full bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700"
          >
            <div
              class="bg-gradient-to-r from-emerald-500 to-teal-400 h-2.5 transition-all duration-500"
              :style="{ width: `${props.coveragePercentage}%` }"
            ></div>
          </div>
          <span
            class="text-emerald-400 text-sm font-bold min-w-[35px] text-right"
            >{{ props.coveragePercentage }}%</span
          >
        </div>
      </div>
      <div class="flex flex-col justify-between items-end text-right">
        <span class="text-sm font-black text-amber-400 tracking-wider mt-1"
          >ROUND {{ props.currentTurn }} / 7</span
        >
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import Cell from "./Cell.vue";

const props = defineProps<{
  grid: Array<
    Array<{ row: number; col: number; type: "empty" | "flower" | "seed" }>
  >;
  gridSize: number;
  phase: "dandelion" | "wind";
  gameOver: boolean;
  coveragePercentage: number;
  currentTurn: number;
  phaseBannerClass: string;
  phaseMessage: string;
}>();

const emit = defineEmits<{
  (e: "cell-click", row: number, col: number): void;
}>();

const flattenedGrid = computed(() => props.grid.flat());
</script>
