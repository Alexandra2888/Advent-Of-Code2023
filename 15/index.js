//PART 1

// const fs = require("fs");

// function hash(s) {
//   let v = 0;

//   for (let i = 0; i < s.length; i++) {
//     v += s.charCodeAt(i);
//     v *= 17;
//     v %= 256;
//   }

//   return v;
// }

// function hashSumOfResults() {
//   const input = fs.readFileSync("./input.txt", "utf-8");
//   const inputList = input.split(",");

//   let result = 0;
//   for (const str of inputList) {
//     result += hash(str);
//   }

//   console.log(result);
// }

// hashSumOfResults();

//PART 2

const fs = require("fs");

function hashed(s) {
  let v = 0;

  for (const ch of s) {
    v += ch.codePointAt(0);
    v *= 17;
    v %= 256;
  }

  return v;
}

function powerOfResultLens() {
  const boxes = Array.from({ length: 256 }, () => []);
  const focalLengths = {};

  const instructions = fs.readFileSync("./input.txt", "utf-8").split(",");

  for (const instruction of instructions) {
    if (instruction.includes("-")) {
      const label = instruction.slice(0, -1);
      const index = hashed(label);

      boxes[index] = boxes[index].filter((l) => l !== label);
    } else {
      const [label, length] = instruction.split("=");
      const lengthValue = parseInt(length, 10);

      const index = hashed(label);
      if (!boxes[index].includes(label)) {
        boxes[index].push(label);
      }

      focalLengths[label] = lengthValue;
    }
  }

  let total = 0;

  for (let i = 0; i < boxes.length; i++) {
    for (let j = 0; j < boxes[i].length; j++) {
      const label = boxes[i][j];
      total += (i + 1) * (j + 1) * focalLengths[label];
    }
  }

  console.log(total);
}

powerOfResultLens();
