"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const fileData = fs_1.default.readFileSync("data_day8.txt", "utf8");
const data = fileData.split("\n");
const sequence = data[0];
const lines = data.slice(2, data.length);
let network = [];
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
    }
    else {
        nodeToFind = actualNode.right;
    }
    actualNode = network.find((node) => node.actual === nodeToFind);
    steps++;
}
console.log(steps);
