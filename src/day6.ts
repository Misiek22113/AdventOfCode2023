import fs from "fs";

type raceInfo = {
  time: number;
  recordDistance: number;
  ways: number;
};

const inputData = fs.readFileSync("data_day6.txt", "utf-8");

const data = inputData.split("\n");

let races: raceInfo[] = [];

let lineTime = data[0]
  .trim()
  .split(" ")
  .filter((value) => value !== "");
let lineDistance = data[1]
  .trim()
  .split(" ")
  .filter((value) => value !== "");

lineTime.map((value, index) => {
  if (index > 0) {
    races.push({
      time: parseInt(value),
      recordDistance: parseInt(lineDistance[index]),
      ways: 0,
    });
  }
});

let result = 1;

races.map((race) => {
  let ways = 0;
  for (let time = 0; time < race.time; time++) {
    let timeLeft = race.time - time;
    let speed = time;
    if (timeLeft + time > race.time) {
      break;
    }
    let distance = speed * timeLeft;
    if (distance > race.recordDistance) {
      ways += 1;
    }
  }
  race.ways = ways;
  result *= ways;
});

console.log(result);
