import { AppState, GameState } from './util';

export const createMockState = (): AppState => {
  return {
    gameState: GameState.Start,
    apple: { row: 1, col: 1 },
    dimensions: {
      rows: 10,
      cols: 10,
    },
  };
};
