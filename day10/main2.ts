import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let X = 1;
let cycleCount = 1;

let currentLine = '';

const drawPixel = (cycleCount: number) => {
  let pixelToBeDrawn = '.';

  // compute horizontal position of the
  // current pixel being drawn (0-39)
  const pixelPosition = (cycleCount - 1) % 40;
  if ([X - 1, X, X + 1].includes(pixelPosition)) {
    pixelToBeDrawn = '#';
  }

  currentLine += pixelToBeDrawn;
  // Print line when it is complete (40 chars)
  if (cycleCount % 40 === 0) {
    console.log(currentLine);
    currentLine = '';
  }
};

for await (const line of readLines(file)) {
  const [instruction, value] = line.split(' ');

  // Common for both 'noop' and 'addx'
  drawPixel(cycleCount);
  cycleCount++;

  // Use another cycle for 'addx'
  if (instruction === 'addx') {
    drawPixel(cycleCount);
    X += Number(value);
    cycleCount++;
  }
}
