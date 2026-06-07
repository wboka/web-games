<template>
  <transition
    enter-active-class="transition duration-200 ease-out"
    enter-from-class="transform scale-95 opacity-0"
    enter-to-class="transform scale-100 opacity-100"
    leave-active-class="transition duration-150 ease-in"
    leave-from-class="transform scale-100 opacity-100"
    leave-to-class="transform scale-95 opacity-0"
  >
    <div
      v-if="showRules"
      class="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl text-sm text-slate-300 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <div>
        <h3 class="font-bold text-amber-400 mb-2 flex items-center gap-1">
          🎮 Core Mechanics
        </h3>
        <ul class="list-disc pl-5 space-y-1.5 text-slate-400">
          <li>
            <strong class="text-slate-200">Setup:</strong> 7 rounds. Dandelions
            try to claim the board; Wind tries to save 1 square.
          </li>
          <li>
            <strong class="text-slate-200">Dandelion Turn:</strong> Plant 🌼 on
            an empty square or over an existing seed.
          </li>
          <li>
            <strong class="text-slate-200">Wind Turn:</strong> Select an
            available compass arrow. Gusts blow out from
            <em>all</em> flowers simultaneously, dropping seeds 🌱 along the path.
          </li>
        </ul>
      </div>
      <div
        class="border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6"
      >
        <h3 class="font-bold text-sky-400 mb-2 flex items-center gap-1">
          ✨ Match Modes
        </h3>
        <ul class="list-disc pl-5 space-y-1.5 text-slate-400">
          <li>
            <strong class="text-slate-200">Standard PvP:</strong> Classic 5x5
            strategic confrontation.
          </li>
          <li>
            <strong class="text-slate-200">Double Planting:</strong> Turn 1
            gets a double action for both roles.
          </li>
          <li>
            <strong class="text-slate-200">Keeping Score:</strong> 7x7 board
            where remaining safe zones equal wind points.
          </li>
          <li>
            <strong class="text-slate-200">Collaborative Sandbox:</strong>
            Massive 8x8 open-ended setup.
          </li>
        </ul>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  showRules: boolean;
}>();
</script>
