"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync("data_day9.txt", "utf-8");
const line = data.split("\n");
// let histories = line.map((line) => {
// })
