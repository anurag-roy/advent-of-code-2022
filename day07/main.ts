import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

const currentPath: string[] = [];
// Could not get the desired type :(
const fileSystem: any = {
  '/': {},
};

for await (const line of readLines(file)) {
  // Check if command
  if (line.startsWith('$')) {
    const [_prompt, command, arg] = line.split(' ');

    // Handling for 'cd' command
    if (command === 'cd') {
      if (arg === '..') {
        currentPath.pop();
      } else {
        currentPath.push(arg);
      }
    }
  } else {
    // Handle ls outputs
    const [lsOutputCol1, lsOutputCol2] = line.split(' ');
    // Find the currentDir for which the output is being shown
    const currentDir = currentPath.reduce(
      (childDir, dirName) => childDir[dirName],
      fileSystem
    );
    if (lsOutputCol1 === 'dir') {
      currentDir[lsOutputCol2] = {};
    } else {
      // We can get away by not storing the file
      // names but instead storing their sizes only
      currentDir.files ||= [];
      currentDir.files.push(Number(lsOutputCol1));
    }
  }
}

const dirSizes: number[] = [];

// Recursively compute size of each directory
// and populate dirSizes array
const computeDirSize = (dir: any) => {
  let currentDirSize = 0;
  for (const key of Object.keys(dir)) {
    if (key !== 'files') {
      currentDirSize += computeDirSize(dir[key]);
    } else {
      currentDirSize += (dir.files as number[]).reduce(
        (currentSum, currentSize) => currentSum + currentSize,
        0
      );
    }
  }
  dirSizes.push(currentDirSize);
  return currentDirSize;
};

const totalSpaceOccupied = computeDirSize(fileSystem);

// Part 1
const MAX_DIR_SIZE = 100000;
console.log(
  dirSizes
    .filter((s) => s <= MAX_DIR_SIZE)
    .reduce((currentSum, currentSize) => currentSum + currentSize, 0)
);

// Part 2
const TOTAL_DISK_SIZE = 70000000;
const DISK_SPACE_REQUIRED = 30000000;
const spaceNeededToBeCleared =
  DISK_SPACE_REQUIRED - (TOTAL_DISK_SIZE - totalSpaceOccupied);
const smallestDirThatCanBeCleared = dirSizes
  .sort((s1, s2) => s1 - s2)
  .find((s) => s > spaceNeededToBeCleared);

console.log(smallestDirThatCanBeCleared);
