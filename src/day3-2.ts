import fs from "fs";

type nodeData = {
  x: number;
  y: number;
  char: string;
};

type cords = {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  adjacentNumbers: string[];
};

type adjacentNumbers = {
  x: number;
  y: number;
  adjacentNumbers: number[];
};

const starRegex = /\*/;
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

const addSurroundingCords = ({
  baseX,
  baseY,
}: {
  baseX: number;
  baseY: number;
}) => {
  const surroundingCords = [
    { x: baseX - 1, y: baseY - 1 },
    { x: baseX, y: baseY - 1 },
    { x: baseX + 1, y: baseY - 1 },
    { x: baseX - 1, y: baseY },
    { x: baseX + 1, y: baseY },
    { x: baseX - 1, y: baseY + 1 },
    { x: baseX, y: baseY + 1 },
    { x: baseX + 1, y: baseY + 1 },
  ];

  surroundingCords.forEach((cord) => {
    const { x, y } = cord;
    if (x >= 0 && x < lineLength && y >= 0 && y < lines.length) {
      approvedCords.push({
        baseX: baseX,
        baseY: baseY,
        ...cord,
        adjacentNumbers: [],
      });
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
    if (line.charAt(i).match(starRegex)) {
      addSurroundingCords({ baseX: i, baseY: index });
    }
  }
});

let index = 0;

let result: adjacentNumbers[] = [];

while (index < allChars.length) {
  let matchCord: adjacentNumbers | undefined;
  let isValid = false;
  let number: string[] = [];
  while (allChars[index].char.match(numberRegex)) {
    let currentChar = allChars[index];
    number.push(currentChar.char);
    const matchingCord: cords | undefined = approvedCords.find(
      (cord) => cord.x === currentChar.x && cord.y === currentChar.y
    );
    if (matchingCord) {
      isValid = true;
      matchCord = {
        x: matchingCord.baseX,
        y: matchingCord.baseY,
        adjacentNumbers: [],
      };
    }
    index++;
  }
  index++;
  if (isValid) {
    if (matchCord) {
      const isCordInTab = result.find(
        (cord) => cord.x === matchCord?.x && cord.y === matchCord?.y
      );
      if (isCordInTab) {
        isCordInTab.adjacentNumbers = [
          ...isCordInTab.adjacentNumbers,
          parseInt(number.join("")),
        ];
      } else {
        matchCord.adjacentNumbers = [parseInt(number.join(""))];
        result.push(matchCord);
      }
    }
  }
}

let finalResult = 0;

result.map((cord) => {
  if (cord.adjacentNumbers.length === 2) {
    finalResult += cord.adjacentNumbers[0] * cord.adjacentNumbers[1];
  }
});

console.log(finalResult);
