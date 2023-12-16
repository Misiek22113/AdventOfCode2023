import fs from "fs";

type CategoryMap = {
  destination: number;
  source: number;
  length: number;
};

type Pair = {
  key: number;
  value: number;
};

type SeedData = {
  actualValue: number;
  nextValue: number;
};

interface Category {
  name: string;
  maps: CategoryMap[];
}

interface CategoryResult extends Category {
  resultTab: Pair[];
}

const data = fs.readFileSync("./inputs/data_day5.txt", "utf-8");
const splittedData = data.split("\n");
const seedsLine = splittedData[0];

const seedsData: SeedData[] = seedsLine
  .split(" ")
  .slice(1)
  .map((number) => ({
    actualValue: parseInt(number),
    nextValue: parseInt(number),
  }));

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

categories.forEach((category) => {
  category.maps.forEach((map) => {
    const offset = map.destination - map.source;
    seedsData.forEach((seed) => {
      if (
        seed.actualValue >= map.source &&
        seed.actualValue < map.source + map.length
      ) {
        seed.nextValue = seed.actualValue + offset;
      }
    });
  });

  seedsData.forEach((seed) => {
    seed.actualValue = seed.nextValue;
  });
});

let minimum = seedsData[0].actualValue;
for (let i = 1; i < seedsData.length; i++) {
  if (seedsData[i].actualValue < minimum) {
    minimum = seedsData[i].actualValue;
  }
}

console.log(minimum);
