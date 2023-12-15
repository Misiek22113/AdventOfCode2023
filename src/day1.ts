import fs from "fs";

const input = fs.readFileSync("data.txt", "utf8");

let words = input.split("\n");

words = words.map((word) => {
  return word.trim();
});

let result = 0;
let front = false;
let back = false;

words.map((word) => {
  front = false;
  back = false;
  let number: string = "";
  let wordLength = word.length;
  console.log(word);
  for (let i = 0; i <= word.length; i++) {
    if (word.charAt(i) >= "0" && word.charAt(i) <= "9" && !front) {
      number = word.charAt(i) + number;
      front = true;
    }
    if (
      word.charAt(wordLength - i) >= "0" &&
      word.charAt(wordLength - i) <= "9" &&
      !back
    ) {
      number = number + word.charAt(wordLength - i);
      back = true;
    }
    if (front && back) {
      result += parseInt(number);
      console.log(number);
      break;
    }
  }
});

console.log(result);
