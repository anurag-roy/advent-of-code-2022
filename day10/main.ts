import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let X = 1;
let cycleCount = 1;

let totalSignalStrength = 0;

const updateSignalStrength = (cycleCount: number) => {
  if ((cycleCount - 20) % 40 === 0) {
    totalSignalStrength += cycleCount * X;
  }
};

for await (const line of readLines(file)) {
  const [instruction, value] = line.split(' ');

  // Common for both 'noop' and 'addx'
  updateSignalStrength(cycleCount);
  cycleCount++;

  // Use another cycle for 'addx'
  if (instruction === 'addx') {
    updateSignalStrength(cycleCount);
    X += Number(value);
    cycleCount++;
  }
}

console.log(totalSignalStrength);
