"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const starRegex = /\*/;
const specialCharactersRegex = /[!@#$%^&*()\-_=+\[\]{}|\\;:'"`,/<>?~`]/;
const numberRegex = /[0-9]/;
const input = fs_1.default.readFileSync("data_day3.txt", "utf-8");
const lines = input.split("\n");
const engineSchema = lines.map((line) => {
    return line.trim();
});
let allChars = [];
let lineLength = 0;
let approvedCords = [];
const addSurroundingCords = ({ baseX, baseY, }) => {
    const surroundingCords = [
        { x: baseX - 1, y: baseY - 1 },
        { x: baseX, y: baseY - 1 },
        { x: baseX + 1, y: baseY - 1 },
        { x: baseX - 1, y: baseY },
        { x: baseX + 1, y: baseY },
        { x: baseX - 1, y: baseY + 1 },
        { x: baseX, y: baseY + 1 },
        { x: baseX + 1, y: baseY + 1 },
    ];
    surroundingCords.forEach((cord) => {
        const { x, y } = cord;
        if (x >= 0 && x < lineLength && y >= 0 && y < lines.length) {
            approvedCords.push(Object.assign(Object.assign({ baseX: baseX, baseY: baseY }, cord), { adjacentNumbers: [] }));
        }
    });
};
engineSchema.map((line, index) => {
    for (let i = 0; i < line.length; i++) {
        lineLength = line.length;
        allChars.push({
            x: i,
            y: index,
            char: line.charAt(i).replace(specialCharactersRegex, "*"),
        });
        if (line.charAt(i).match(starRegex)) {
            addSurroundingCords({ baseX: i, baseY: index });
        }
    }
});
let index = 0;
let result = [];
while (index < allChars.length) {
    let matchCord;
    let isValid = false;
    let number = [];
    while (allChars[index].char.match(numberRegex)) {
        let currentChar = allChars[index];
        number.push(currentChar.char);
        const matchingCord = approvedCords.find((cord) => cord.x === currentChar.x && cord.y === currentChar.y);
        if (matchingCord) {
            isValid = true;
            matchCord = {
                x: matchingCord.baseX,
                y: matchingCord.baseY,
                adjacentNumbers: [],
            };
        }
        index++;
    }
    index++;
    if (isValid) {
        if (matchCord) {
            const isCordInTab = result.find((cord) => cord.x === (matchCord === null || matchCord === void 0 ? void 0 : matchCord.x) && cord.y === (matchCord === null || matchCord === void 0 ? void 0 : matchCord.y));
            if (isCordInTab) {
                isCordInTab.adjacentNumbers = [
                    ...isCordInTab.adjacentNumbers,
                    parseInt(number.join("")),
                ];
            }
            else {
                matchCord.adjacentNumbers = [parseInt(number.join(""))];
                result.push(matchCord);
            }
        }
    }
}
let finalResult = 0;
result.map((cord) => {
    if (cord.adjacentNumbers.length === 2) {
        finalResult += cord.adjacentNumbers[0] * cord.adjacentNumbers[1];
    }
});
console.log(finalResult);
