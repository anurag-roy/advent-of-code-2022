// Part 2
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
import intersection from 'https://esm.sh/lodash@4.17.21/intersection';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let sum = 0;
let tempBuffer = [];

for await (const line of readLines(file)) {
  const contents = line.split('').map((c) => {
    const code = c.charCodeAt(0);
    if (code >= 97) {
      return code - 96;
    } else {
      return code - 38;
    }
  });

  tempBuffer.push(contents);
  if (tempBuffer.length === 3) {
    sum += intersection(...tempBuffer)[0];
    tempBuffer = [];
  }
}

console.log('Priority sum is : ', sum);
