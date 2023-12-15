import fs from "fs";

type quiz = {
  winNumbers: string;
  checkNumbers: string;
  result: number;
  instances: number;
};

const fileData = fs.readFileSync("data_day4.txt", "utf-8");

const quizzesLine = fileData.split("\n");

const quizzes = quizzesLine.map((line) => {
  return line.trim();
});

let toCheck: quiz[] = [];

quizzes.map((line) => {
  let splitted = line.split(":");
  let numbers = splitted[1].split("|");
  toCheck.push({
    winNumbers: numbers[0],
    checkNumbers: numbers[1],
    result: 0,
    instances: 1,
  });
});

let finalResult = 0;

toCheck.forEach((quiz, index) => {
  let isFirst = true;
  let res = 0;

  let winList = quiz.winNumbers
    .split(" ")
    .map((number) => {
      return parseInt(number);
    })
    .filter((number) => {
      return !Number.isNaN(number);
    });
  let checkList = quiz.checkNumbers
    .split(" ")
    .map((number) => {
      return parseInt(number);
    })
    .filter((number) => {
      return !Number.isNaN(number);
    });
  checkList.forEach((number) => {
    if (winList.includes(number)) {
      res += 1;
    }
  });
  for (let i = index + 1; i <= index + res; i++) {
    if (i >= toCheck.length) break;
    console.log(index, i);
    toCheck[i].instances += 1 * quiz.instances;
  }
  quiz.result = res;
  finalResult += quiz.instances;
});

console.log(toCheck, finalResult);
