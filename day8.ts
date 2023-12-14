import fs from "fs";

const fileData = fs.readFileSync("data_day8.txt", "utf8");

type network = {
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
    actual: nodes[0].trim(),
    left: nodes[1].trim(),
    right: nodes[2].trim(),
  });
});

let actualNode = network[startIndex];

let steps = 0;
let nodeToFind = "";

while (actualNode.actual !== "ZZZ") {
  const direction = sequence.charAt(steps % (sequence.length - 1));
  if (direction == "L") {
    nodeToFind = actualNode.left;
  } else {
    nodeToFind = actualNode.right;
  }

  actualNode = network.find((node) => node.actual === nodeToFind)!;

  steps++;
}

console.log(steps);
