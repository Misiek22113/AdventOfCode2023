import fs from "fs";

type hand = {
  hand: string;
  bid: number;
  result: number;
  rank: number;
};

const inputData = fs.readFileSync("data_day7.txt", "utf-8");

const games = inputData.split("\n");

let hands: hand[] = [];

const findLayout = ({ cards }: { cards: number[] }): number => {
  const jokerNumber = cards[0];
  cards = cards.slice(1, cards.length);
  let max = Math.max(...cards);
  let index = cards.indexOf(max);
  if (max < 5) {
    if (max + jokerNumber > 5) {
      max = 5;
      cards[index] = 5;
    } else {
      max += jokerNumber;
      cards[index] += jokerNumber;
    }
  }
  let filteredPairs = cards.filter((card) => card == 2);
  let rank = 0;
  if (max == 5) {
    rank = 6;
  } else if (max == 4) {
    rank = 5;
  } else if (cards.includes(3) && cards.includes(2)) {
    rank = 4;
  } else if (max == 3) {
    rank = 3;
  } else if (filteredPairs.length == 2) {
    rank = 2;
  } else if (filteredPairs.length == 1) {
    rank = 1;
  }
  return rank;
};

games.map((game) => {
  const data = game.trim().split(" ");
  const cards = data[0].split("");
  let cardsCounter: number[] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  cards.map((card) => {
    if (card >= "2" && card <= "9") {
      let index = parseInt(card);
      cardsCounter[index] += 1;
    } else {
      if (card === "A") {
        cardsCounter[14] += 1;
      } else if (card === "K") {
        cardsCounter[13] += 1;
      } else if (card === "Q") {
        cardsCounter[12] += 1;
      } else if (card === "T") {
        cardsCounter[10] += 1;
      } else if (card === "J") {
        cardsCounter[0] += 1;
      }
    }
  });
  hands.push({
    hand: data[0],
    bid: parseInt(data[1]),
    result: 0,
    rank: findLayout({ cards: cardsCounter }),
  });
});

let result = 0;

const res = hands.sort((card1, card2) => {
  const vars = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ];
  if (card1.rank === card2.rank) {
    let charsCard1 = card1.hand.split("");
    let charsCard2 = card2.hand.split("");
    for (let i = 0; i < charsCard1.length; i++) {
      if (charsCard1.at(i) === charsCard2.at(i)) {
        continue;
      } else if (
        vars.indexOf(charsCard1.at(i) as string) >
        vars.indexOf(charsCard2.at(i) as string)
      ) {
        return 1;
      } else {
        return -1;
      }
    }
  } else if (card1.rank < card2.rank) {
    return -1;
  } else {
    return 1;
  }
  return 0;
});

res.map((hand, index) => {
  result += hand.bid * (index + 1);
});

console.log(res, result);
