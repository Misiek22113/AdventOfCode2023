"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync("data_day9.txt", "utf-8");
const line = data.split("\n");
let historyLine = [];
line.map((line) => {
    const val = line
        .trim()
        .split(" ")
        .map((number) => {
        return parseInt(number);
    });
    let firstElements = [];
    firstElements.push(val[val.length - 1]);
    historyLine.push({
        data: val,
        result: 0,
        lastElements: firstElements,
    });
});
historyLine.forEach((history) => {
    while (true) {
        let temp = [];
        for (let i = 1; i < history.data.length; i++) {
            let res = history.data[i] - history.data[i - 1];
            temp.push(res);
        }
        if (temp.filter((number) => number === 0).length === temp.length) {
            break;
        }
        history.data = temp;
        history.lastElements.push(temp[temp.length - 1]);
    }
});
let finalRes = 0;
historyLine.map((data) => {
    let num1 = data.lastElements[data.lastElements.length - 1];
    let num2 = data.lastElements[data.lastElements.length - 2];
    if (data.lastElements.length > 2) {
        let res = num1 + num2;
        data.lastElements
            .reverse()
            .slice(2)
            .map((num) => {
            res = res + num;
        });
        data.result = res;
        finalRes += res;
    }
    else {
        data.result = num1 + num2;
        finalRes += data.result;
    }
});
console.log(finalRes);
