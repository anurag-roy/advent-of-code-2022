// Part 2
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

type Play = 'Rock' | 'Paper' | 'Scissors';
type Result = 'Win' | 'Loss' | 'Draw';

const symbolToPlayMap: Record<string, Play> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
};

const symbolToResultMap: Record<string, Result> = {
  X: 'Loss',
  Y: 'Draw',
  Z: 'Win',
};

const playToPointMap: Record<Play, number> = {
  Rock: 1,
  Paper: 2,
  Scissors: 3,
};

const resultToPointMap: Record<Result, number> = {
  Loss: 0,
  Draw: 3,
  Win: 6,
};

const playToWinMap: Record<Play, Play> = {
  Scissors: 'Rock', // Play 'Scissors' to WIN against 'Rock'
  Paper: 'Scissors', // Play 'Paper' to WIN against 'Scissors'
  Rock: 'Paper', // Play 'Rock' to WIN against 'Paper'
};

const computePlayFromResult = (oppPlay: Play, result: Result): Play => {
  if (result === 'Draw') {
    return oppPlay;
  }

  if (result === 'Win') {
    return playToWinMap[oppPlay];
  }

  return playToWinMap[playToWinMap[oppPlay]];
};

let myPoints = 0;

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

for await (const line of readLines(file)) {
  const [oppPlay, result] = line.split(' ');

  const myPlay = computePlayFromResult(
    symbolToPlayMap[oppPlay],
    symbolToResultMap[result]
  );
  myPoints +=
    playToPointMap[myPlay] + resultToPointMap[symbolToResultMap[result]];
}

console.log('My points are : ', myPoints);
