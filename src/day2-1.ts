import fs from "fs";

interface gameInfoType {
  id: number;
  isCorrect: boolean;
  red: number;
  blue: number;
  green: number;
}

const parameters = {
  red: 12,
  green: 13,
  blue: 14,
};

const input = fs.readFileSync("data_day2.txt", "utf8");

let lines = input.split("\n");

lines = lines.map((line) => {
  return line.trim();
});

let results: gameInfoType[] = [];

lines.forEach((line) => {
  let lineInfo = line.split(/[,;:]/);
  let minColors = {
    red: 0,
    blue: 0,
    green: 0,
  };
  let gameInfo = lineInfo[0];
  let colorInfo = lineInfo.slice(1, lineInfo.length);
  const gameId = parseInt(gameInfo.split(" ")[1]);
  let isValid = true;
  for (let i = 0; i < colorInfo.length; i++) {
    let colorValues = colorInfo[i].split(" ");
    if (
      parameters[colorValues[2] as keyof typeof parameters] <
      parseInt(colorValues[1])
    ) {
      isValid = false;
    }
    if (
      minColors[colorValues[2] as keyof typeof parameters] <
      parseInt(colorValues[1])
    ) {
      minColors[colorValues[2] as keyof typeof parameters] = parseInt(
        colorValues[1]
      );
    }
  }
  let newGame: gameInfoType = {
    id: gameId,
    isCorrect: isValid,
    red: minColors.red,
    blue: minColors.blue,
    green: minColors.green,
  };
  results = [...results, newGame];
});

let idSum: number = 0;
let cubsSum: number = 0;

results.forEach((result) => {
  if (result.isCorrect) {
    idSum += result.id;
  }
  cubsSum += result.blue * result.green * result.red;
});

console.log(cubsSum);
