import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

type Elevation = {
  elevation: number;
  visited: boolean;
  distanceFromSource: number;
  i: number;
  j: number;
  start?: boolean;
  end?: boolean;
};
const elevationMap: Elevation[][] = [];

let i = 0;
for await (const line of readLines(file)) {
  elevationMap.push(
    line.split('').map((c, j) => {
      const obj: Elevation = {
        elevation: c.charCodeAt(0),
        visited: false,
        distanceFromSource: Number.MAX_SAFE_INTEGER,
        i: i,
        j: j,
      };
      if (c === 'S') {
        obj.elevation = 97;
        obj.start = true;
      }
      if (c === 'E') {
        obj.elevation = 122;
        obj.end = true;
      }
      return obj;
    })
  );
  i++;
}

const populateDistances = (currentStep: Elevation, currentDistance: number) => {
  currentStep.distanceFromSource = currentDistance + 1;
  currentStep.visited = true;

  if (currentStep.end) {
    return;
  }

  const { i, j } = currentStep;

  [
    elevationMap[i - 1]?.[j],
    elevationMap[i]?.[j + 1],
    elevationMap[i + 1]?.[j],
    elevationMap[i]?.[j - 1],
  ]
    .filter(
      (s) =>
        s !== undefined &&
        !s.visited &&
        s.elevation - currentStep.elevation <= 1
    )
    .forEach((s) => populateDistances(s, currentStep.distanceFromSource));
};

const startingStep = elevationMap.flat().find((s) => s.start);
const endingStep = elevationMap.flat().find((s) => s.end);

if (!startingStep || !endingStep) {
  Deno.exit(1);
}

populateDistances(startingStep, -1);

console.log(endingStep.distanceFromSource);
