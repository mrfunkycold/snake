import React from 'react';
import { Apple, Snake } from '../common/types';
import { isSnakeAtPosition, isTheApple } from '../common/util';
import Col from './Col';

export interface RowProps {
  row: number;
  cols: number;
  snake: Snake;
  apple: Apple;
}

const Row: React.SFC<RowProps> = ({ row, cols, snake, apple }) => {
  const rows = [];

  for (let c = 0; c < cols; c += 1) {
    rows.push(<Col key={c} filled={getFilled(snake, apple, row, c)} />);
  }

  return <div className="snake__board-row">{rows}</div>;
};

function getFilled(snake: Snake, apple: Apple, row: number, col: number) {
  if (isSnakeAtPosition(snake, row, col)) {
    return 'snake';
  }

  if (isTheApple(apple, row, col)) {
    return 'apple';
  }

  return '';
}

export default Row;