import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

const trees: number[][] = [];

for await (const line of readLines(file)) {
  trees.push(line.split('').map(Number));
}

type NextFunction = (i: number, j: number) => [number, number];

// calculate scenic score in a single direction
const calculateScore = (i: number, j: number, getNextIndices: NextFunction) => {
  const baseTree = trees[i][j];
  [i, j] = getNextIndices(i, j);
  let nextTree = trees[i]?.[j];

  let scenicScore = 0;
  while (true) {
    if (nextTree === undefined) break;
    scenicScore++;
    if (nextTree >= baseTree) {
      break;
    }
    [i, j] = getNextIndices(i, j);
    nextTree = trees[i]?.[j];
  }

  return scenicScore;
};

let maxScenicScore = 0;

for (let i = 0; i < trees.length; i++) {
  for (let j = 0; j < trees[i].length; j++) {
    const scenicScore =
      calculateScore(i, j, (x, y) => [--x, y]) *
      calculateScore(i, j, (x, y) => [x, ++y]) *
      calculateScore(i, j, (x, y) => [++x, y]) *
      calculateScore(i, j, (x, y) => [x, --y]);
    maxScenicScore = Math.max(maxScenicScore, scenicScore);
  }
}

console.log(maxScenicScore);
