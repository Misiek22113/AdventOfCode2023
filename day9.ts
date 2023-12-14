import fs from "fs";

type history = {
  data: number[];
  result: number;
};

const data = fs.readFileSync("data_day9.txt", "utf-8");

const line = data.split("\n");

// let histories = line.map((line) => {

// })
