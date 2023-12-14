import fs from "fs";

const fileData = fs.readFileSync("data_day8.txt", "utf8");

type network = {
  steps: number;
  isFound: boolean;
  actual: string;
  left: string;
  right: string;
};

const data = fileData.split("\n");

const sequence = data[0];

const lines = data.slice(2, data.length);

let network: network[] = [];

const regex = /[=\(\),]/g;
let startIndex = 0;

lines.map((line, index) => {
  let nodes = line.replace(regex, "").split(" ");
  nodes = nodes.filter((node) => node !== "");
  if (nodes[0].trim() === "AAA") {
    startIndex = index;
  }
  network.push({
    steps: 0,
    isFound: false,
    actual: nodes[0].trim(),
    left: nodes[1].trim(),
    right: nodes[2].trim(),
  });
});

let startNodes = network.filter((node) => {
  return node.actual[node.actual.length - 1] === "A";
});

let steps = 0;

while (
  startNodes.filter((node) => {
    return node.isFound === true;
  }).length !== startNodes.length
) {
  const direction = sequence.charAt(steps % (sequence.length - 1));
  let tempNodes: network[] = [];
  if (direction == "L") {
    startNodes.map((node) => {
      let nodeToFind = node.left;
      let actualNode = network.find(
        (newNode) => newNode.actual === nodeToFind
      )!;
      if (!node.isFound) {
        node.steps += 1;
      }
      if (actualNode.actual[actualNode.actual.length - 1] === "Z") {
        node.isFound = true;
      }
      tempNodes.push({
        ...actualNode,
        steps: node.steps,
        isFound: node.isFound,
      });
    });
  } else {
    startNodes.forEach((node) => {
      let nodeToFind = node.right;
      let actualNode = network.find(
        (newNode) => newNode.actual === nodeToFind
      )!;
      if (!node.isFound) {
        node.steps += 1;
      }
      if (actualNode.actual[actualNode.actual.length - 1] === "Z") {
        node.isFound = true;
      }
      tempNodes.push({
        ...actualNode,
        steps: node.steps,
        isFound: node.isFound,
      });
    });
  }

  startNodes = tempNodes;

  steps++;
}

let stepsResult: number[] = startNodes.map((node) => {
  return node.steps;
});

const findNWD = ({ a, b }: { a: number; b: number }) => {
  let i = 0;
  while (b != 0) {
    i = b;
    b = a % b;
    a = i;
  }
  return a;
};

const calculateNWW = (stepsResult: number[]) => {
  const findNWW = ({ a, b }: { a: number; b: number }) => {
    return (a * b) / findNWD({ a, b });
  };

  let nww = stepsResult[0];
  for (let i = 1; i < stepsResult.length; i++) {
    nww = findNWW({ a: nww, b: stepsResult[i] });
  }

  return nww;
};

const nwwResult = calculateNWW(stepsResult);
console.log(nwwResult);
