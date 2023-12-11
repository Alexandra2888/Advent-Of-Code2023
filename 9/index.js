const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .split("\r\n")
      .map((sequence) => sequence.split(" ").map(Number));
  } catch (error) {
    console.log(error);
  }
};

const findNextSequence = (sequence) => {
  if (sequence.every((num) => num === 0)) return 0;
  const newSequence = [];
  for (let i = 1; i < sequence.length; i++) {
    newSequence.push(sequence[i] - sequence[i - 1]);
  }

  return sequence[sequence.length - 1] + findNextSequence(newSequence);
};

const part1 = () => {
  try {
    const sequences = readInput();
    if (!sequences) throw new Error("Failed to parse input");
    const ans = sequences.reduce(
      (acc, sequence) => acc + findNextSequence(sequence),
      0
    );

    console.log("Part 1", ans);
  } catch (error) {
    console.log(error);
  }
};

const findPrevSequence = (sequence) => {
  if (sequence.every((num) => num === 0)) return 0;
  const newSequence = [];
  for (let i = 1; i < sequence.length; i++) {
    newSequence.push(sequence[i] - sequence[i - 1]);
  }

  return sequence[0] - findPrevSequence(newSequence);
};

const part2 = () => {
  try {
    const sequences = readInput();
    if (!sequences) throw new Error("Failed to parse input");
    const ans = sequences.reduce(
      (acc, sequence) => acc + findPrevSequence(sequence),
      0
    );

    console.log("Part 2", ans);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
