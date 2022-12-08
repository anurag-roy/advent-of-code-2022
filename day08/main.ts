import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

const trees: { height: number; visible: boolean }[][] = [];

for await (const line of readLines(file)) {
  // set visible false by default
  trees.push(
    line.split('').map((t) => ({
      height: Number(t),
      visible: false,
    }))
  );
}

let visibleCount = 0;

// Run loops in four directions and keep updating trees
// which are computed to be visible (from any direction)
// Probably should be a smarter way, but brute force
// will do for now :)
let MAX;

// 1. Row wise (left to right)
for (let i = 0; i < trees.length; i++) {
  MAX = -1;
  for (let j = 0; j < trees[i].length; j++) {
    const tree = trees[i][j];
    if (tree.height > MAX) {
      MAX = tree.height;
      if (tree.visible === false) {
        tree.visible = true;
        visibleCount++;
      }
    }
  }
}

// 2. Row wise (right to left)
for (let i = 0; i < trees.length; i++) {
  MAX = -1;
  for (let j = trees[i].length - 1; j >= 0; j--) {
    const tree = trees[i][j];
    if (tree.height > MAX) {
      MAX = tree.height;
      if (tree.visible === false) {
        tree.visible = true;
        visibleCount++;
      }
    }
  }
}

// 3. Column wise (top to bottom)
for (let i = 0; i < trees.length; i++) {
  MAX = -1;
  for (let j = 0; j < trees[i].length; j++) {
    const tree = trees[j][i];
    if (tree.height > MAX) {
      MAX = tree.height;
      if (tree.visible === false) {
        tree.visible = true;
        visibleCount++;
      }
    }
  }
}

// 4. Column wise (bottom to top)
for (let i = trees.length - 1; i >= 0; i--) {
  MAX = -1;
  for (let j = trees[i].length - 1; j >= 0; j--) {
    const tree = trees[j][i];
    if (tree.height > MAX) {
      MAX = tree.height;
      if (tree.visible === false) {
        tree.visible = true;
        visibleCount++;
      }
    }
  }
}

console.log(visibleCount);
