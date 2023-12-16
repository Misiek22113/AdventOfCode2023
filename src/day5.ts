import fs from "fs";

type categoryMap = {
  destination: number;
  source: number;
  length: number;
};

type pair = {
  key: number;
  value: number;
};

interface category {
  name: string;
  maps: categoryMap[];
}

interface categoryResult extends category {
  resultTab: pair[];
}

const data = fs.readFileSync("./inputs/test.txt", "utf-8");

let splittedData = data.split("\n");

let seedsLine = splittedData[0];

let seedsData: number[] = seedsLine
  .split(" ")
  .slice(1)
  .map((number) => parseInt(number));

let categoriesData = splittedData
  .slice(1, data.length)
  .map((line) => line.trim());

let categories: category[] = [];

let breakIndex: number[] = [];

categoriesData.map((line, index) => {
  line === "" ? breakIndex.push(index) : "";
});

for (let i = 0; i < breakIndex.length; i++) {
  let tmpMaps: categoryMap[] = [];
  let maps = categoriesData.slice(breakIndex[i] + 2, breakIndex[i + 1]);
  maps.map((singleMap) => {
    let rawValues = singleMap.split(" ").map((value) => parseInt(value));
    tmpMaps.push({
      destination: rawValues[0],
      source: rawValues[1],
      length: rawValues[2],
    });
  });
  categories.push({ name: categoriesData[breakIndex[i] + 1], maps: tmpMaps });
}

let categoriesResults: categoryResult[] = [];

categories.map((category) => {
  let tmp: pair[] = [];
  category.maps.map((map) => {
    for (let i = 0; i < map.length; i++) {
      let index = tmp.findIndex((mapPair) => mapPair.key === map.source + i);
      if (index !== -1) {
        tmp[index].value = map.destination + i;
      }
      tmp.push({ key: map.source + i, value: map.destination + i });
    }
  });
  categoriesResults.push({
    ...category,
    resultTab: tmp,
  });
});

let result = 9999;

console.log(categoriesResults);

seedsData.map((seed) => {
  let actualSeed = seed;
  categoriesResults.map((category) => {
    let res = category.resultTab.findIndex((pair) => pair.key === actualSeed);
    if (res !== -1) {
      actualSeed = category.resultTab[res].value;
    }
  });
  if (actualSeed < result) {
    result = actualSeed;
  }
});

// categoriesResults.map((category) => {
//   console.log(category.name, category.resultTab);
// });

console.log(result);
