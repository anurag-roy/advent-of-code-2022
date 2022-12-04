import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let count = 0;

for await (const line of readLines(file)) {
  const [ass1, ass2] = line.split(',');
  const [ass1Start, ass1End] = ass1.split('-').map(Number);
  const [ass2Start, ass2End] = ass2.split('-').map(Number);

  if (
    (ass1Start <= ass2Start && ass1End >= ass2End) ||
    (ass2Start <= ass1Start && ass2End >= ass1End)
  ) {
    count++;
  }
}

console.log('Count is : ', count);
