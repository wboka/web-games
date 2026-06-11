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
        <dl class="divide-y divide-slate-600 text-slate-400">
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Setup</dt>
            <dd>
              7 rounds. Dandelions try to claim the board; Wind tries to save 1
              square.
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Dandelion Turn</dt>
            <dd class="py-2">
              Plant 🌼 on an empty square or over an existing seed.
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Wind Turn</dt>
            <dd class="py-2">
              Select an available compass arrow. Gusts blow out from <em>all</em>
              flowers simultaneously, dropping seeds 🌱 along the path.
            </dd>
          </div>
        </dl>
      </div>
      <div
        class="border-t md:border-t-0 md:border-l border-slate-700 pt-4 md:pt-0 md:pl-6"
      >
        <h3 class="font-bold text-sky-400 mb-2 flex items-center gap-1">
          ✨ Game Modes
        </h3>
        <dl class="divide-y divide-slate-600 text-slate-400">
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Standard PvP</dt>
            <dd class="py-2">
              Classic 5x5 strategic confrontation.
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Double Planting</dt>
            <dd class="py-2">
              Turn 1 gets a double action for both roles.
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Keeping Score</dt>
            <dd class="py-2">
              7x7 board where remaining safe zones equal wind points.
            </dd>
          </div>
          <div class="px-4 py-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:px-0">
            <dt class="pl-0 py-2 font-bold">Collaborative Sandbox</dt>
            <dd class="py-2">
              Massive 8x8 open-ended setup.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const props = defineProps<{
  showRules: boolean;
}>();
</script>
