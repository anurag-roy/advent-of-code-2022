// Part 1
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

type Play = 'Rock' | 'Paper' | 'Scissors';
type Result = 'Win' | 'Loss' | 'Draw';

const symbolToPlayMap: Record<string, Play> = {
  A: 'Rock',
  B: 'Paper',
  C: 'Scissors',
  X: 'Rock',
  Y: 'Paper',
  Z: 'Scissors',
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

const computeResultFromPlay = (oppPlay: Play, myPlay: Play): Result => {
  if (oppPlay === myPlay) {
    return 'Draw';
  }

  if (myPlay === playToWinMap[oppPlay]) {
    return 'Win';
  } else {
    return 'Loss';
  }
};

let myPoints = 0;

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

for await (const line of readLines(file)) {
  const [oppPlay, myPlay] = line.split(' ');

  // Part 1
  const result = computeResultFromPlay(
    symbolToPlayMap[oppPlay],
    symbolToPlayMap[myPlay]
  );
  myPoints +=
    playToPointMap[symbolToPlayMap[myPlay]] + resultToPointMap[result];
}

console.log('My points are : ', myPoints);
