<script setup lang="ts">
const props = defineProps<{
  cell: { row: number; col: number; type: "empty" | "flower" | "seed" };
  disabled: boolean;
}>();

const emit = defineEmits<{
  (e: "cell-click"): void;
}>();
</script>

<template>
  <button
    type="button"
    @click="!props.disabled && emit('cell-click')"
    :disabled="props.disabled"
    class="relative rounded-xl border transition-all duration-200 group flex items-center justify-center text-2xl select-none w-full h-full focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-slate-950"
    :class="[
      props.cell.type === 'flower'
        ? 'bg-slate-800 border-amber-500/30 shadow-md'
        : props.cell.type === 'seed'
          ? 'bg-emerald-950/40 border-emerald-800/40 hover:bg-slate-900'
          : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50 hover:bg-slate-800/50 cursor-pointer',
    ]"
  >
    <div
      v-if="props.cell.type === 'empty'"
      class="absolute inset-1 rounded-lg border border-dashed border-slate-800/40 group-hover:border-emerald-500/20 text-slate-400 text-sm transition-all flex items-center justify-center"
    >
      {{ props.cell.row }}, {{ props.cell.col }}
    </div>

    <span
      v-if="props.cell.type === 'flower'"
      class="drop-shadow-md scale-110 animate-[bounce_1.5s_infinite]"
      >🌼</span
    >
    <span
      v-else-if="props.cell.type === 'seed'"
      class="drop-shadow-[0_2px_4px_rgba(16,185,129,0.2)] text-xl"
      >🌱</span
    >
  </button>
</template>
