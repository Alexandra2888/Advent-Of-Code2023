const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    const cards = fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf-8")
      .split("\r\n")
      .map((card) => {
        const sets = card.split(": ")[1].split(" | ");
        const winningCards = sets[0].split(" ").reduce((acc, num) => {
          const parsedNum = parseInt(num.trim());
          if (!isNaN(parsedNum)) acc.add(parsedNum);
          return acc;
        }, new Set());

        const myCards = sets[1].split(" ").reduce((acc, num) => {
          const parsedNum = parseInt(num.trim());
          if (!isNaN(parsedNum)) acc.add(parsedNum);
          return acc;
        }, new Set());

        return {
          winningCards,
          myCards,
        };
      });
    return cards;
  } catch (error) {
    console.log(error);
  }
};

const part1 = () => {
  try {
    const games = readInput();
    if (!games) throw new Error("Failed to parse input");

    let sum = 0;
    for (const { myCards, winningCards } of games) {
      const numOfWins = Array.from(myCards).reduce((acc, num) => {
        return acc + (winningCards.has(num) ? 1 : 0);
      }, 0);

      if (numOfWins > 0) sum += 2 ** (numOfWins - 1);
    }
    console.log("Part 1", sum);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const games = readInput();
    if (!games) throw new Error("Failed to parse input");

    const numOfCards = games.reduce((acc, _, idx) => {
      acc[idx + 1] = 1;
      return acc;
    }, {});

    games.forEach(({ myCards, winningCards }, idx) => {
      const numOfWins = Array.from(myCards).reduce((acc, num) => {
        return acc + (winningCards.has(num) ? 1 : 0);
      }, 0);

      for (let i = 1; i <= numOfWins; i++) {
        numOfCards[idx + 1 + i] += numOfCards[idx + 1];
      }
    });

    const sum = Object.values(numOfCards).reduce((acc, val) => acc + val, 0);
    console.log("Part 2", sum);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
