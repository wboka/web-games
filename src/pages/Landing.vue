<template>
  <div
    class="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans antialiased selection:bg-emerald-500 selection:text-white"
  >
    <main class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-extrabold tracking-tight mb-6">Simple Web Games</h1>
      <p class="text-slate-300 mb-8">
        Browser-based mini-games. Click a game below to play.
      </p>
      <ul class="grid gap-4">
        <li>
          <router-link
            to="/dandelion/"
            class="block p-6 rounded-2xl border border-slate-700/60 bg-slate-800 hover:bg-slate-700 transition-colors"
          >
            <h2 class="text-xl font-bold mb-2">🌾 Dandelions vs. Wind</h2>
            <p class="text-slate-400">
              Strategic board game: plant dandelions, launch wind gusts, protect the meadow.
            </p>
          </router-link>
        </li>
      </ul>
    </main>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
