// const input = await Deno.readTextFile('./sample_input.txt');
const input = await Deno.readTextFile('./input.txt');

// Part 1
// const SEQUENCE_LENGTH = 4;
// Part 2
const SEQUENCE_LENGTH = 14;

let marker = 0;
const sequenceChars: string[] = [];

while (marker <= input.length) {
  const currentChar = input[marker];

  const foundIndex = sequenceChars.findIndex((c) => c === currentChar);
  if (foundIndex > -1) {
    sequenceChars.splice(0, foundIndex + 1);
  }

  sequenceChars.push(currentChar);
  marker++;

  if (sequenceChars.length === SEQUENCE_LENGTH) {
    break;
  }
}

console.log(marker);
