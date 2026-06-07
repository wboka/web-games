<template>
  <div
    class="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-8 font-sans antialiased selection:bg-emerald-500 selection:text-white"
  >
    <div class="max-w-6xl mx-auto flex flex-col gap-6">
      <AppHeader
        :showRules="showRules"
        @toggle-rules="toggleRules"
        @reset-game="resetGame"
      />

      <RulesPanel :showRules="showRules" />

      <main class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <section
          class="lg:col-span-7 bg-slate-800 p-6 rounded-3xl border border-slate-700/60 shadow-xl flex flex-col items-center"
        >
          <Board
            :grid="grid"
            :gridSize="gridSize"
            :phase="phase"
            :gameOver="gameOver"
            :coveragePercentage="coveragePercentage"
            :currentTurn="currentTurn"
            :phaseBannerClass="phaseBannerClass"
            :phaseMessage="phaseMessage"
            @cell-click="handleCellClick"
          />
        </section>

        <section class="lg:col-span-5 flex flex-col gap-6">
          <ControlPanel
            :gridSize="gridSize"
            :gameVariant="gameVariant"
            :gameStarted="gameStarted"
            :directions="directions"
            :phase="phase"
            :gameOver="gameOver"
            :totalUncovered="totalUncovered"
            @update:gridSize="handleGridSizeChange"
            @update:gameVariant="handleGameVariantChange"
            @wind-blow="handleWindBlow"
          />
        </section>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import AppHeader from "./components/AppHeader.vue";
import RulesPanel from "./components/RulesPanel.vue";
import Board from "./components/Board.vue";
import ControlPanel from "./components/ControlPanel.vue";

type CellType = "empty" | "flower" | "seed";

interface Cell {
  row: number;
  col: number;
  type: CellType;
}

interface Direction {
  id: string;
  name: string;
  icon: string;
  x: number; // Radial unit multiplier for absolute layout alignment logic
  y: number; // Radial unit multiplier for absolute layout alignment logic
  dr: number; // Grid column index alteration delta step properties
  dc: number; // Grid column index alteration delta step properties
  used: boolean;
}

const gridSize = ref<number>(5);
const gameVariant = ref<string>("standard");
const grid = ref<Cell[][]>([]);
const phase = ref<"dandelion" | "wind">("dandelion");
const currentTurn = ref<number>(1);
const gameOver = ref<boolean>(false);
const gameStarted = ref<boolean>(false);
const showRules = ref<boolean>(false);

const doublePlantCounter = ref<number>(0);
const doubleWindCounter = ref<number>(0);

const directions = ref<Direction[]>([
  {
    id: "N",
    name: "North",
    icon: "⬆️",
    x: 0,
    y: -1,
    dr: -1,
    dc: 0,
    used: false,
  },
  {
    id: "NE",
    name: "NorthEast",
    icon: "↗️",
    x: 0.71,
    y: -0.71,
    dr: -1,
    dc: 1,
    used: false,
  },
  { id: "E", name: "East", icon: "➡️", x: 1, y: 0, dr: 0, dc: 1, used: false },
  {
    id: "SE",
    name: "SouthEast",
    icon: "↘️",
    x: 0.71,
    y: 0.71,
    dr: 1,
    dc: 1,
    used: false,
  },
  { id: "S", name: "South", icon: "⬇️", x: 0, y: 1, dr: 1, dc: 0, used: false },
  {
    id: "SW",
    name: "SouthWest",
    icon: "↙️",
    x: -0.71,
    y: 0.71,
    dr: 1,
    dc: -1,
    used: false,
  },
  {
    id: "W",
    name: "West",
    icon: "⬅️",
    x: -1,
    y: 0,
    dr: 0,
    dc: -1,
    used: false,
  },
  {
    id: "NW",
    name: "NorthWest",
    icon: "↖️",
    x: -0.71,
    y: -0.71,
    dr: -1,
    dc: -1,
    used: false,
  },
]);

const flattenedGrid = computed(() => grid.value.flat());
const totalCells = computed(() => gridSize.value * gridSize.value);
const totalUncovered = computed(
  () => flattenedGrid.value.filter((c) => c.type === "empty").length,
);

const coveragePercentage = computed(() => {
  if (totalCells.value === 0) return 0;
  const covered = flattenedGrid.value.filter((c) => c.type !== "empty").length;
  return Math.round((covered / totalCells.value) * 100);
});

const phaseMessage = computed(() => {
  if (gameOver.value) return gameOverMessage.value;

  if (phase.value === "dandelion") {
    if (gameVariant.value === "doublePlant" && currentTurn.value === 1) {
      return `🌼 Dandelion gust: Plant flower deployment item #${doublePlantCounter.value + 1} of 2`;
    }
    return "🌼 Dandelion's Turn: Choose an uncultivated cell (or override seed) to deploy flower!";
  } else {
    if (gameVariant.value === "doublePlant" && currentTurn.value === 1) {
      return `🍃 Wind: Engage wind directional vector entry #${doubleWindCounter.value + 1} of 2`;
    }
    return "🍃 Wind's turn: Select an unused direction from the compass dial!";
  }
});

const phaseBannerClass = computed(() => {
  if (gameOver.value) {
    const allCovered = totalUncovered.value === 0;
    if (gameVariant.value === "collaborative")
      return "bg-purple-950/40 border-purple-500/30 text-purple-300";
    if (gridSize.value === 7)
      return "bg-indigo-950/40 border-indigo-500/30 text-indigo-300";
    return allCovered
      ? "bg-amber-950/40 border-amber-500/30 text-amber-300"
      : "bg-sky-950/40 border-sky-500/30 text-sky-300";
  }
  return phase.value === "dandelion"
    ? "bg-amber-950/40 border-amber-500/20 text-amber-400"
    : "bg-sky-950/40 border-sky-500/20 text-sky-400";
});

const gameOverMessage = computed(() => {
  const allCovered = totalUncovered.value === 0;

  if (gameVariant.value === "collaborative") {
    return allCovered
      ? `🎉 Collaborative Victory! Total coverage hit 100% on a ${gridSize.value}x${gridSize.value} board!`
      : `🏁 Sandbox Mode Finished! System coverage clocked at ${coveragePercentage.value}% (${totalCells.value - totalUncovered.value}/${totalCells.value} units).`;
  }

  if (gridSize.value === 7) {
    return `🏁 Round Over (Scoring Run)! Wind earns ${totalUncovered.value} point(s) from left-over clear blocks.`;
  }

  return allCovered
    ? "🎉 Victory to the Dandelions! The entire meadow has been successfully claimed!"
    : `🍃 Victory to the Wind! The ecosystem preserved ${totalUncovered.value} empty grid coordinate sectors.`;
});

const resetGame = () => {
  const newGrid: Cell[][] = [];
  for (let r = 0; r < gridSize.value; r++) {
    const rowCells: Cell[] = [];
    for (let c = 0; c < gridSize.value; c++) {
      rowCells.push({ row: r, col: c, type: "empty" });
    }
    newGrid.push(rowCells);
  }
  grid.value = newGrid;

  directions.value.forEach((d) => (d.used = false));
  currentTurn.value = 1;
  phase.value = "dandelion";
  gameOver.value = false;
  gameStarted.value = false;
  doublePlantCounter.value = 0;
  doubleWindCounter.value = 0;
};

const toggleRules = () => {
  showRules.value = !showRules.value;
};

const handleGridSizeChange = (value: number) => {
  gridSize.value = value;
  resetGame();
};

const handleGameVariantChange = (value: string) => {
  gameVariant.value = value;
  resetGame();
};

const handleCellClick = (row: number, col: number) => {
  if (gameOver.value || phase.value !== "dandelion") return;

  const targetCell = grid.value[row][col];
  if (targetCell.type === "flower") return;

  gameStarted.value = true;
  targetCell.type = "flower";

  if (gameVariant.value === "doublePlant" && currentTurn.value === 1) {
    doublePlantCounter.value++;
    if (doublePlantCounter.value < 2) return;
  }

  if (totalUncovered.value === 0) {
    evaluateSystemEndgame();
    return;
  }

  phase.value = "wind";
};

const handleWindBlow = (dir: Direction) => {
  if (gameOver.value || phase.value !== "wind" || dir.used) return;

  dir.used = true;

  const flowersToProcess: { r: number; c: number }[] = [];
  for (let r = 0; r < gridSize.value; r++) {
    for (let c = 0; c < gridSize.value; c++) {
      if (grid.value[r][c].type === "flower") {
        flowersToProcess.push({ r, c });
      }
    }
  }

  flowersToProcess.forEach((f) => {
    let currentR = f.r + dir.dr;
    let currentC = f.c + dir.dc;

    while (
      currentR >= 0 &&
      currentR < gridSize.value &&
      currentC >= 0 &&
      currentC < gridSize.value
    ) {
      if (grid.value[currentR][currentC].type === "empty") {
        grid.value[currentR][currentC].type = "seed";
      }
      currentR += dir.dr;
      currentC += dir.dc;
    }
  });

  if (gameVariant.value === "doublePlant" && currentTurn.value === 1) {
    doubleWindCounter.value++;
    if (doubleWindCounter.value < 2) {
      if (totalUncovered.value === 0) evaluateSystemEndgame();
      return;
    }
  }

  evaluateSystemEndgame();
};

const evaluateSystemEndgame = () => {
  if (totalUncovered.value === 0 || currentTurn.value >= 7) {
    gameOver.value = true;
    return;
  }
  currentTurn.value++;
  phase.value = "dandelion";
};

onMounted(() => {
  resetGame();
});
</script>
