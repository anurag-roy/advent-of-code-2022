import { readLines } from 'https://deno.land/std@0.167.0/io/buffer.ts';

class Monkey {
  items: number[] = [];
  operator!: string;
  operationNumber?: number;
  testNumber!: number;
  nextMonkeyIfTrue!: number;
  nextMonkeyIfFalse!: number;
  inspectionCount = 0;

  updateWorryLevel(item: number) {
    const operationNumber = this.operationNumber ?? item;
    if (this.operator === '+') {
      item += operationNumber;
    } else if (this.operator === '*') {
      item *= operationNumber;
    }
    return Math.floor(item / 3);
  }

  inspectItems(monkeys: Monkey[]) {
    while (this.items.length > 0) {
      let item = this.items.shift()!;
      item = this.updateWorryLevel(item);
      const nextMonkey =
        item % this.testNumber === 0
          ? this.nextMonkeyIfTrue
          : this.nextMonkeyIfFalse;
      monkeys[nextMonkey].items.push(item);
      this.inspectionCount++;
    }
  }
}

// const file = await Deno.open('./sample_input.txt');
const file = await Deno.open('./input.txt');

const fileIterator = readLines(file);
const getNextLine = async (): Promise<{ done?: boolean; value: string }> => {
  return await fileIterator.next();
};

const monkeys: Monkey[] = [];

const inputSingleMonkey = async () => {
  let currentLine = await getNextLine();
  const monkey = new Monkey();
  monkeys.push(monkey);

  currentLine = await getNextLine();
  monkey.items = currentLine.value
    .split('Starting items: ')[1]
    .split(', ')
    .map(Number);

  currentLine = await getNextLine();
  const [operator, operationNumber] = currentLine.value
    .split('Operation: new = old ')[1]
    .split(' ');
  monkey.operator = operator;
  if (!Number.isNaN(Number(operationNumber))) {
    monkey.operationNumber = Number(operationNumber);
  }

  currentLine = await getNextLine();
  monkey.testNumber = Number(currentLine.value.split('Test: divisible by ')[1]);

  currentLine = await getNextLine();
  monkey.nextMonkeyIfTrue = Number(
    currentLine.value.split('If true: throw to monkey ')[1]
  );

  currentLine = await getNextLine();
  monkey.nextMonkeyIfFalse = Number(
    currentLine.value.split('If false: throw to monkey ')[1]
  );
};

while (true) {
  await inputSingleMonkey();
  const line = await getNextLine();
  if (line.done) break;
}

const NUMBER_OF_ROUNDS = 20;

for (let i = 0; i < NUMBER_OF_ROUNDS; i++) {
  monkeys.forEach((m) => m.inspectItems(monkeys));
}

monkeys.sort((m1, m2) => m2.inspectionCount - m1.inspectionCount);
const monkeyBusiness = monkeys[0].inspectionCount * monkeys[1].inspectionCount;
console.log(monkeyBusiness);
