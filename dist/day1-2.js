"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const input = fs_1.default.readFileSync("data.txt", "utf8");
let words = input.split("\n");
words = words.map((word) => {
    return word.trim();
});
let result = 0;
let front = false;
let back = false;
const numbers = {
    zero: 0,
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
};
words.map((word) => {
    front = false;
    back = false;
    let number = "";
    let wordLength = word.length;
    for (let i = 0; i <= word.length; i++) {
        if (word.charAt(i) >= "0" && word.charAt(i) <= "9" && !front) {
            number = word.charAt(i) + number;
            front = true;
        }
        else if (!front) {
            for (let j = 3; j <= 5; j++) {
                const subString = word.substring(i, i + j);
                const num = numbers[subString];
                if (num !== undefined) {
                    number = num + number;
                    front = true;
                    break;
                }
            }
        }
        if (word.charAt(wordLength - i) >= "0" &&
            word.charAt(wordLength - i) <= "9" &&
            !back) {
            number = number + word.charAt(wordLength - i);
            back = true;
        }
        else if (!back) {
            for (let j = 3; j <= 5; j++) {
                const subString = word.substring(wordLength - i - j, wordLength - i);
                const num = numbers[subString];
                if (num !== undefined) {
                    number = number + num;
                    back = true;
                    break;
                }
            }
        }
        if (front && back) {
            console.log(number);
            result += parseInt(number);
            break;
        }
    }
});
console.log(result);
