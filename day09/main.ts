import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

type Coordinate = [number, number];
let headCoordinates: Coordinate = [0, 0];
let tailCoordinates: Coordinate = [0, 0];

// Store co-ordinates as strings e.g.
// "(2,3)", so its easier to compare
const visitedCoordinates = new Set<string>();

const computeHeadMove = ([x, y]: Coordinate, direction: string): Coordinate => {
  switch (direction) {
    case 'U':
      return [x, ++y];
    case 'R':
      return [++x, y];
    case 'D':
      return [x, --y];
    case 'L':
      return [--x, y];
    default:
      return [x, y];
  }
};

const computeTailMove = (
  [x1, y1]: Coordinate,
  [x2, y2]: Coordinate
): Coordinate => {
  const xDistance = x2 - x1;
  const yDistance = y2 - y1;

  // if adjacent, no need to move
  if (Math.abs(xDistance) <= 1 && Math.abs(yDistance) <= 1) {
    return [x1, y1];
  }

  if (xDistance > 0) x1++;
  if (xDistance < 0) x1--;
  if (yDistance > 0) y1++;
  if (yDistance < 0) y1--;

  return [x1, y1];
};

for await (const line of readLines(file)) {
  const input = line.split(' ');
  const direction = input[0];
  const steps = Number(input[1]);

  for (let i = 0; i < steps; i++) {
    headCoordinates = computeHeadMove(headCoordinates, direction);
    tailCoordinates = computeTailMove(tailCoordinates, headCoordinates);
    visitedCoordinates.add(`(${tailCoordinates[0]},${tailCoordinates[1]})`);
  }
}

console.log(visitedCoordinates.size);
