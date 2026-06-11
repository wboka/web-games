/**
 * Local Storage utilities for saving game state and app preferences
 */

export interface GamePreferences {
  lastGame?: string;
  theme?: 'light' | 'dark';
}

export interface Cell {
  row: number;
  col: number;
  type: 'empty' | 'flower' | 'seed';
}

export interface Direction {
  id: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  dr: number;
  dc: number;
  used: boolean;
}

export interface DandelionGameState {
  // Board state
  grid: Cell[][];
  gridSize: number;
  gameVariant: 'standard' | 'doublePlant' | 'collaborative';

  // Game phase
  phase: 'dandelion' | 'wind';
  currentTurn: number;
  gameOver: boolean;
  gameStarted: boolean;
  showRules: boolean;

  // Counters
  doublePlantCounter: number;
  doubleWindCounter: number;

  // Directions state
  directions: Direction[];

  // Metadata
  preferences: GamePreferences;
  savedAt: number;
}

const STORAGE_KEYS = {
  PREFERENCES: 'simply-web-games:preferences',
  DANDELION_STATE: 'simply-web-games:dandelion',
} as const;

export const storage = {
  /**
   * Save app-wide preferences
   */
  savePreferences(prefs: GamePreferences): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PREFERENCES, JSON.stringify(prefs));
    } catch (err) {
      console.warn('Failed to save preferences:', err);
    }
  },

  /**
   * Load app-wide preferences
   */
  loadPreferences(): GamePreferences {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PREFERENCES);
      return stored ? JSON.parse(stored) : { theme: 'dark' };
    } catch (err) {
      console.warn('Failed to load preferences:', err);
      return { theme: 'dark' };
    }
  },

  /**
   * Save full Dandelion game state (board + settings)
   */
  saveDandelionFullState(state: Omit<DandelionGameState, 'preferences' | 'savedAt'>): void {
    try {
      const prefs = this.loadPreferences();
      const fullState: DandelionGameState = {
        ...state,
        preferences: prefs,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEYS.DANDELION_STATE, JSON.stringify(fullState));
    } catch (err) {
      console.warn('Failed to save full Dandelion state:', err);
    }
  },

  /**
   * Load full Dandelion game state
   */
  loadDandelionFullState(): DandelionGameState | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DANDELION_STATE);
      if (!stored) return null;
      return JSON.parse(stored);
    } catch (err) {
      console.warn('Failed to load Dandelion state:', err);
      return null;
    }
  },

  /**
   * Save Dandelion game state (settings only, not full board state)
   */
  saveDandelionState(gridSize: number, gameVariant: string): void {
    try {
      const prefs = this.loadPreferences();
      const state: DandelionGameState = {
        grid: [],
        gridSize,
        gameVariant: gameVariant as 'standard' | 'doublePlant' | 'collaborative',
        phase: 'dandelion',
        currentTurn: 1,
        gameOver: false,
        gameStarted: false,
        showRules: false,
        doublePlantCounter: 0,
        doubleWindCounter: 0,
        directions: [],
        preferences: prefs,
        savedAt: Date.now(),
      };
      localStorage.setItem(STORAGE_KEYS.DANDELION_STATE, JSON.stringify(state));
    } catch (err) {
      console.warn('Failed to save Dandelion state:', err);
    }
  },

  /**
   * Load Dandelion game state (returns defaults if not found)
   */
  loadDandelionState(): DandelionGameState {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DANDELION_STATE);
      if (!stored) {
        return {
          grid: [],
          gridSize: 5,
          gameVariant: 'standard',
          phase: 'dandelion',
          currentTurn: 1,
          gameOver: false,
          gameStarted: false,
          showRules: false,
          doublePlantCounter: 0,
          doubleWindCounter: 0,
          directions: [],
          preferences: this.loadPreferences(),
          savedAt: 0,
        };
      }
      return JSON.parse(stored);
    } catch (err) {
      console.warn('Failed to load Dandelion state:', err);
      return {
        grid: [],
        gridSize: 5,
        gameVariant: 'standard',
        phase: 'dandelion',
        currentTurn: 1,
        gameOver: false,
        gameStarted: false,
        showRules: false,
        doublePlantCounter: 0,
        doubleWindCounter: 0,
        directions: [],
        preferences: this.loadPreferences(),
        savedAt: 0,
      };
    }
  },

  /**
   * Clear all stored data
   */
  clearAll(): void {
    try {
      localStorage.removeItem(STORAGE_KEYS.PREFERENCES);
      localStorage.removeItem(STORAGE_KEYS.DANDELION_STATE);
    } catch (err) {
      console.warn('Failed to clear storage:', err);
    }
  }
}
