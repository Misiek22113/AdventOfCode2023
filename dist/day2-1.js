"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const parameters = {
    red: 12,
    green: 13,
    blue: 14,
};
const input = fs_1.default.readFileSync("data_day2.txt", "utf8");
let lines = input.split("\n");
lines = lines.map((line) => {
    return line.trim();
});
let results = [];
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
        if (parameters[colorValues[2]] <
            parseInt(colorValues[1])) {
            isValid = false;
        }
        if (minColors[colorValues[2]] <
            parseInt(colorValues[1])) {
            minColors[colorValues[2]] = parseInt(colorValues[1]);
        }
    }
    let newGame = {
        id: gameId,
        isCorrect: isValid,
        red: minColors.red,
        blue: minColors.blue,
        green: minColors.green,
    };
    results = [...results, newGame];
});
let idSum = 0;
let cubsSum = 0;
results.forEach((result) => {
    if (result.isCorrect) {
        idSum += result.id;
    }
    cubsSum += result.blue * result.green * result.red;
});
console.log(cubsSum);
