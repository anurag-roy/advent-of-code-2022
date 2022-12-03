// Part 1
import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';
import intersection from 'https://esm.sh/lodash@4.17.21/intersection';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let sum = 0;

for await (const line of readLines(file)) {
  const contents = line.split('').map((c) => {
    const code = c.charCodeAt(0);
    if (code >= 97) {
      return code - 96;
    } else {
      return code - 38;
    }
  });
  const comp1Contents = contents.slice(0, contents.length / 2);
  const comp2Contents = contents.slice(contents.length / 2);

  sum += intersection(comp1Contents, comp2Contents)[0];
}

console.log('Priority sum is : ', sum);
