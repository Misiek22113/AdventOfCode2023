import fs from "fs";

type history = {
  data: number[];
  result: number;
  firstElements: number[];
};

const data = fs.readFileSync("data_day9.txt", "utf-8");

const line = data.split("\n");

let historyLine: history[] = [];

line.map((line) => {
  const val: number[] = line
    .trim()
    .split(" ")
    .map((number) => {
      return parseInt(number);
    });
  let firstElements: number[] = [];
  firstElements.push(val[0]);
  historyLine.push({
    data: val,
    result: 0,
    firstElements: firstElements,
  });
});

historyLine.forEach((history) => {
  while (true) {
    let temp: number[] = [];
    for (let i = 1; i < history.data.length; i++) {
      let res = history.data[i] - history.data[i - 1];
      temp.push(res);
    }
    if (temp.filter((number) => number === 0).length === temp.length) {
      break;
    }
    history.data = temp;
    history.firstElements.push(temp[0]);
  }
});

let finalRes = 0;

historyLine.map((data) => {
  let res = 0;
  if (data.firstElements.length > 2) {
    console.log("first num", res);
    data.firstElements.reverse().map((num) => {
      res = num - res;
    });
    data.result = res;
    finalRes += res;
  } else {
    data.result = data.firstElements[0] - data.firstElements[1];
    finalRes += data.result;
  }
});

console.log(historyLine);

console.log(finalRes);
