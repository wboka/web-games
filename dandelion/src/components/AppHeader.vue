<template>
  <header
    class="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-800/80 backdrop-blur-md p-6 rounded-2xl border border-slate-700/50 shadow-xl gap-4"
  >
    <div>
      <div class="flex items-center gap-3">
        <span class="text-3xl animate-pulse">🌾</span>
        <h1
          class="text-3xl font-extrabold tracking-tight bg-linear-to-r from-amber-400 via-emerald-400 to-sky-400 bg-clip-text text-transparent"
        >
          Dandelions vs. Wind
        </h1>
      </div>
      <p
        class="text-slate-400 text-xs mt-1 font-medium tracking-wide uppercase"
      >
        Based on the mathematical lawn game
      </p>
    </div>

    <div class="flex items-center gap-2 w-full md:w-auto justify-end">
      <button
        @click="$emit('toggle-rules')"
        class="px-4 py-2 text-xs font-semibold rounded-xl bg-slate-700 hover:bg-slate-600 border border-slate-600 transition-all active:scale-95"
      >
        {{ showRules ? "📖 Hide Rules" : "📖 Show Rules" }}
      </button>
      <button
        @click="$emit('reset-game')"
        class="px-4 py-2 text-xs font-bold rounded-xl bg-linear-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow-lg shadow-emerald-900/20 border border-emerald-400/20 transition-all active:scale-95"
      >
        🔄 Restart Match
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  showRules: boolean;
}>();
</script>
