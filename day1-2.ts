import fs from "fs";

const input = fs.readFileSync("data.txt", "utf8");

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
  let number: string = "";
  let wordLength = word.length;
  for (let i = 0; i <= word.length; i++) {
    if (word.charAt(i) >= "0" && word.charAt(i) <= "9" && !front) {
      number = word.charAt(i) + number;
      front = true;
    } else if (!front) {
      for (let j = 3; j <= 5; j++) {
        const subString: string = word.substring(i, i + j);
        const num = numbers[subString as keyof typeof numbers];
        if (num !== undefined) {
          number = num + number;
          front = true;
          break;
        }
      }
    }
    if (
      word.charAt(wordLength - i) >= "0" &&
      word.charAt(wordLength - i) <= "9" &&
      !back
    ) {
      number = number + word.charAt(wordLength - i);
      back = true;
    } else if (!back) {
      for (let j = 3; j <= 5; j++) {
        const subString: string = word.substring(
          wordLength - i - j,
          wordLength - i
        );
        const num = numbers[subString as keyof typeof numbers];
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
