import {
  moveSnake,
  isSnakeAtApple,
  growSnake,
  randomizeApple,
  isSnakeDead,
  getInitialSnake,
} from './snakeUtil.js';
import { getNextDirection } from './directionUtil.js';
import { incrementScore, getNewHighScore } from './scoreUtil.js';

/**
 * State in which the game initially starts
 */
export function getInitialState({ row, col }) {
  return getNewGameState({
    row,
    col,
    gameState: {
      current: 'start',
    },
  });
}

/**
 * Start for starting a new game
 *
 * @param {Object} options
 * @param {number} options.row
 * @param {number} options.col
 * @param {Object} [options.gameState]
 */
export function getNewGameState({ row, col, gameState }) {
  const initSnake = getInitialSnake();
  const initApple = randomizeApple(initSnake, row, col);
  const highScore = 100;
  const score = 0;
  const timer = 200;

  let newGameState = {
    current: 'run',
  };

  if (gameState) {
    newGameState = gameState;
  }

  return {
    row,
    col,
    score,
    highScore,
    timer,
    snake: initSnake,
    apple: initApple,
    gameState: newGameState,
  };
}

/**
 *
 * Retrieves the new set of options based on the keyboard pressed
 *
 */
export function updateState(state, newDirection) {
  const updateEatApple = updateSnakeEatingApple(state.snake);

  return updateDeadSnake(updateEatApple(updateSnakeDirection(state, newDirection)));
}

export function isGameOver(state) {
  return state.gameState.current === 'gameover';
}

const updateSnakeDirection = (state, newDirection) => {
  const { snake, currentDirection, row, col } = state;

  const nextDirection = getNextDirection(currentDirection, newDirection);
  const newSnake = moveSnake(snake, nextDirection);

  if (isSnakeDead(newSnake, row, col)) {
    return {
      ...state,
      currentDirection: nextDirection,
    };
  }

  return {
    ...state,
    currentDirection: nextDirection,
    snake: newSnake,
  };
};

const updateSnakeEatingApple = oldSnake => state => {
  const { snake, apple } = state;

  if (isSnakeAtApple(snake, apple)) {
    const { score, highScore, row, col } = state;
    const newScore = incrementScore(score);

    return {
      ...state,
      snake: growSnake(snake, oldSnake),
      apple: randomizeApple(snake, row, col),
      score: newScore,
      highScore: getNewHighScore(newScore, highScore),
    };
  }

  return state;
};

const updateDeadSnake = state => {
  const { snake, row, col } = state;

  if (isSnakeDead(snake, row, col)) {
    return {
      ...state,
      gameState: {
        current: 'gameover',
      },
    };
  }

  return state;
};
