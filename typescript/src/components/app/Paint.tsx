import React from 'react';
import { Apple, GameState, Snake } from '../common/types';
import Board from './Board';
import { GameOver } from './GameOver';
import ScoreBoard from './Scoreboard';
import { Start } from './Start';

export interface AppProps {
  row: number;
  col: number;
  score: number;
  highScore: number;
  snake: Snake;
  apple: Apple;
  gameState: GameState;
  onPlayClick: () => void;
}

export interface TransitionScreenProps {
  gameState: AppProps['gameState'];
  onPlayClick: () => void;
}

const TransitionScreen: React.SFC<TransitionScreenProps> = ({ gameState, onPlayClick }) => {
  if (gameState === 'start') {
    return <Start onPlayClick={onPlayClick} />;
  }
  if (gameState === 'gameover') {
    return <GameOver onPlayClick={onPlayClick} />;
  }

  return null;
};

const Paint: React.StatelessComponent<AppProps> = (props) => {
  const { row, col, score, highScore, snake, apple, gameState, onPlayClick } = props;

  return (
    <div className="snake__app">
      <ScoreBoard score={score} highScore={highScore} />
      <Board apple={apple} snake={snake} row={row} col={col} />
      <TransitionScreen gameState={gameState} onPlayClick={onPlayClick} />
    </div>
  );
};

export default Paint;
