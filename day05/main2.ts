import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

const stacks: string[][] = [];
let stackInputComplete = false;

for await (const line of readLines(file)) {
  // newline separates stacks and moves
  if (!line) {
    stackInputComplete = true;
    continue;
  }

  let currentStack = 1;
  // Generate stacks from the input
  if (!stackInputComplete) {
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char && char !== ' ' && char !== '[' && char !== ']') {
        if (!Array.isArray(stacks[currentStack])) {
          stacks[currentStack] = [];
        }
        stacks[currentStack].unshift(char);
      }
      if (i !== 0 && i % 4 === 0) {
        currentStack++;
      }
    }
  } else {
    // Parse moves
    // example text: "move 1 from 2 to 1"
    const [, noOfMoves, , source, , dest] = line.split(' ').map(Number);

    // Apply moves
    const items = stacks[source].splice(stacks[source].length - noOfMoves);
    if (!Array.isArray(stacks[dest])) {
      stacks[dest] = [];
    }
    stacks[dest].push(...items);
  }
}

// Find top item of each stack
const topItemString = stacks.reduce((result, stack) => {
  result = result + (stack[stack.length - 1] ?? ' ');
  return result;
}, '');

console.log(topItemString);
