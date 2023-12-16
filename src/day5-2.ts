import fs from "fs";

type CategoryMap = {
  destination: number;
  source: number;
  length: number;
};

type SeedData = {
  actualValue: number;
  nextValue: number;
};

interface Category {
  name: string;
  maps: CategoryMap[];
}

const data = fs.readFileSync("./inputs/data_day5.txt", "utf-8");
const splittedData = data.split("\n");
const seedsLine = splittedData[0];

const seedsPairs: number[] = seedsLine
  .split(" ")
  .slice(1)
  .map((number) => parseInt(number));

const categoriesData = splittedData.slice(1).map((line) => line.trim());

const breakIndexes: number[] = categoriesData
  .map((line, index) => (line === "" ? index : -1))
  .filter((index) => index !== -1);

const categories: Category[] = breakIndexes.map((breakIndex, idx) => {
  const tmpMaps: CategoryMap[] = [];
  const maps = categoriesData.slice(breakIndex + 2, breakIndexes[idx + 1]);
  maps.forEach((singleMap) => {
    const [destination, source, length] = singleMap
      .split(" ")
      .map((value) => parseInt(value));
    tmpMaps.push({ destination, source, length });
  });
  return { name: categoriesData[breakIndex + 1], maps: tmpMaps };
});

let minimum = seedsPairs[0];

for (let i = 0; i < seedsPairs.length; i += 2) {
  let seedOffset = 0;
  let seed: SeedData;
  for (let j = seedsPairs[i]; j < seedsPairs[i] + seedsPairs[i + 1]; j++) {
    seed = {
      actualValue: seedsPairs[i] + seedOffset,
      nextValue: seedsPairs[i] + seedOffset,
    };
    seedOffset++;
    categories.forEach((category) => {
      category.maps.forEach((map) => {
        const offset = map.destination - map.source;
        if (
          seed.actualValue >= map.source &&
          seed.actualValue < map.source + map.length
        ) {
          seed.nextValue = seed.actualValue + offset;
        }
      });
      seed.actualValue = seed.nextValue;
    });
    if (seed.actualValue < minimum) {
      minimum = seed.actualValue;
    }
  }
}

console.log(minimum);
