<template>
  <div class="bg-slate-800 p-6 rounded-3xl border border-slate-700/60 shadow-xl flex flex-col items-center">
    <h3
      class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 w-full text-left border-b border-slate-700 pb-2"
    >
      🍃 Compass Wind Vector Controller
    </h3>

    <div class="w-full bg-slate-800 p-5 rounded-3xl border border-slate-700/60 shadow-xl flex flex-col gap-4">
      <div class="grid grid-cols-1 gap-3 text-xs">
        <div class="flex flex-col gap-1.5">
          <label class="text-slate-400 font-medium">Meadow Size</label>
          <select
            :value="gridSize"
            @change="updateGridSize"
            :disabled="gameStarted"
            class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option :value="5">5 x 5</option>
            <option :value="6">6 x 6</option>
            <option :value="7">7 x 7</option>
            <option :value="8">8 x 8</option>
          </select>
        </div>

        <div class="flex flex-col gap-1.5">
          <label class="text-slate-400 font-medium">Game Mode</label>
          <select
            :value="gameVariant"
            @change="updateGameVariant"
            :disabled="gameStarted"
            class="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-slate-200 font-semibold focus:outline-none focus:border-emerald-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="standard">Standard</option>
            <option value="doublePlant">Double Planting</option>
            <option value="collaborative">Teamwork</option>
          </select>
        </div>
      </div>
    </div>

    <div class="mt-6 relative w-52 h-52 bg-slate-950 rounded-full border-2 border-slate-800 shadow-2xl flex items-center justify-center p-4">
      <div class="absolute inset-4 rounded-full border border-dashed border-slate-800/60 pointer-events-none"></div>
      <div class="absolute inset-16 rounded-full border border-slate-800 pointer-events-none flex items-center justify-center">
        <div class="w-1.5 h-1.5 bg-slate-700 rounded-full"></div>
      </div>

      <button
        v-for="dir in directions"
        :key="dir.id"
        @click="$emit('wind-blow', dir)"
        :disabled="phase !== 'wind' || dir.used || gameOver"
        :class="[
          'absolute w-10 h-10 rounded-xl text-xs font-black flex flex-col items-center justify-center transition-all duration-200 border shadow-md focus:outline-none',
          dir.used
            ? 'bg-slate-900 border-slate-800 text-slate-600 cursor-not-allowed line-through'
            : phase === 'wind' && !gameOver
              ? 'bg-sky-500 hover:bg-sky-400 border-sky-400 text-white shadow-sky-500/20 scale-100 hover:scale-110 active:scale-95 cursor-pointer ring-2 ring-sky-400/30 animate-[pulse_2s_infinite]'
              : 'bg-slate-800 border-slate-700 text-slate-400 cursor-not-allowed',
        ]"
        :style="{
          top: `calc(50% + ${dir.y * 76}px - 24px)`,
          left: `calc(50% + ${dir.x * 76}px - 24px)`,
        }"
        :title="`Discharge wind vector ${dir.name}`"
      >
        <span class="text-[10px] leading-tight opacity-75 font-medium">{{ dir.id }}</span>
        <span class="text-base leading-none mt-0.5">{{ dir.icon }}</span>
      </button>
    </div>

    <div class="w-full mt-6 bg-slate-950/50 rounded-xl p-3 border border-slate-700/40">
      <span class="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-2">Used Vectors Ledger</span>
      <div class="grid grid-cols-4 gap-1.5 text-center">
        <div
          v-for="dir in directions"
          :key="`ledger-${dir.id}`"
          :class="[
            'py-1 rounded text-[10px] font-bold tracking-wider border transition-colors',
            dir.used
              ? 'bg-slate-900 border-slate-800 text-slate-600 line-through'
              : 'bg-slate-800/80 border-slate-700 text-slate-400',
          ]"
        >
          {{ dir.id }}
        </div>
      </div>
    </div>

    <div
      v-if="gridSize === 7"
      class="w-full mt-4 bg-amber-950/20 border border-amber-500/20 p-3 rounded-xl text-xs flex items-center justify-between"
    >
      <span class="text-amber-400/80 font-medium">Wind Score Potential:</span>
      <span class="font-black text-amber-400 text-sm">{{ totalUncovered }} Point{{ totalUncovered !== 1 ? 's' : '' }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  gridSize: number;
  gameVariant: string;
  gameStarted: boolean;
  directions: Array<{
    id: string;
    name: string;
    icon: string;
    x: number;
    y: number;
    dr: number;
    dc: number;
    used: boolean;
  }>;
  phase: 'dandelion' | 'wind';
  gameOver: boolean;
  totalUncovered: number;
}>();

const emit = defineEmits<{
  (e: 'update:gridSize', value: number): void;
  (e: 'update:gameVariant', value: string): void;
  (e: 'wind-blow', dir: {
    id: string;
    name: string;
    icon: string;
    x: number;
    y: number;
    dr: number;
    dc: number;
    used: boolean;
  }): void;
}>();

const updateGridSize = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:gridSize', Number(target.value));
};

const updateGameVariant = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  emit('update:gameVariant', target.value);
};
</script>
