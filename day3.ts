import fs from "fs";

type nodeData = {
  x: number;
  y: number;
  char: string;
};

type cords = {
  x: number;
  y: number;
};

const specialCharactersRegex = /[!@#$%^&*()\-_=+\[\]{}|\\;:'"`,/<>?~`]/;
const numberRegex = /[0-9]/;

const input = fs.readFileSync("data_day3.txt", "utf-8");
const lines = input.split("\n");
const engineSchema = lines.map((line) => {
  return line.trim();
});

let allChars: nodeData[] = [];

let lineLength = 0;

let approvedCords: cords[] = [];

const addSurroundingCords = (cords: cords) => {
  const { x, y } = cords;

  const surroundingCords = [
    { x: x - 1, y: y - 1 },
    { x: x, y: y - 1 },
    { x: x + 1, y: y - 1 },
    { x: x - 1, y: y },
    { x: x + 1, y: y },
    { x: x - 1, y: y + 1 },
    { x: x, y: y + 1 },
    { x: x + 1, y: y + 1 },
  ];

  surroundingCords.forEach((cord) => {
    const { x, y } = cord;
    if (x >= 0 && x < lineLength && y >= 0 && y < lines.length) {
      approvedCords.push(cord);
    }
  });
};

engineSchema.map((line, index) => {
  for (let i = 0; i < line.length; i++) {
    lineLength = line.length;
    allChars.push({
      x: i,
      y: index,
      char: line.charAt(i).replace(specialCharactersRegex, "*"),
    });
    if (line.charAt(i).match(specialCharactersRegex)) {
      addSurroundingCords({ x: i, y: index });
    }
  }
});

let index = 0;

let result = 0;

while (index < allChars.length) {
  let isValid = false;
  let number: string[] = [];
  while (allChars[index].char.match(numberRegex)) {
    let currentChar = allChars[index];
    number.push(currentChar.char);
    const matchingCord = approvedCords.find(
      (cord) => cord.x === currentChar.x && cord.y === currentChar.y
    );
    if (matchingCord) {
      isValid = true;
    }
    index++;
  }
  index++;
  if (isValid) {
    console.log(number.join(""));
    result += parseInt(number.join(""));
  }
}

console.log(result);
