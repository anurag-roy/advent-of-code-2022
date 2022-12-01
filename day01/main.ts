import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

const allCalories: number[] = [];

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

let currentCalories = 0;
for await (const line of readLines(file)) {
  if (line) {
    const calorie = Number(line);
    currentCalories += calorie;
  } else {
    allCalories.push(currentCalories);
    currentCalories = 0;
  }
}

// Add last running calorieCount
allCalories.push(currentCalories);
file.close();

// Sort descending
allCalories.sort((c1, c2) => c2 - c1);

// Part 1
const maxCalories = allCalories[0];
console.log('Max calories is :', maxCalories);

// Part 2
const topThreeCaloriesTotal = allCalories[0] + allCalories[1] + allCalories[2];
console.log('Total of top 3 calories is : ', topThreeCaloriesTotal);
