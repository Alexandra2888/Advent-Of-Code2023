//PART ONE

// const input = require("fs")
//   .readFileSync("./input.txt", "utf-8")
//   .split(/\r?\n/g);

// const times = input[0]
//   .split(" ")
//   .filter((x) => !isNaN(x) && x != "")
//   .map((x) => +x);
// const distances = input[1]
//   .split(" ")
//   .filter((x) => !isNaN(x) && x != "")
//   .map((x) => +x);
// let wins = [];

// for (let i = 0; i < times.length; i++) {
//   let [duration, record] = [times[i], distances[i]];
//   let raceWins = 0;
//   for (let i = 0; i < duration; i++) {
//     if ((duration - i) * i > record) raceWins++;
//   }
//   wins.push(raceWins);
// }

// console.log(wins.reduce((acc, win) => acc * win));

//PART TWO

const input = require("fs")
  .readFileSync("./input.txt", "utf-8")
  .split(/\r?\n/g);

const duration = +input[0].replaceAll(" ", "").split(":")[1];
const record = +input[1].replaceAll(" ", "").split(":")[1];
let wins = 0;

for (let i = 0; i < duration; i++) {
  if ((duration - i) * i > record) wins++;
}

console.log(wins);
