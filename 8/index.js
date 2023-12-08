const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .split("\r\n")
      .reduce(
        (acc, line, idx) => {
          if (idx === 0) acc.instructions = line;
          else if (line.includes("=")) {
            const [src, dest] = line
              .replaceAll("(", "")
              .replaceAll(")", "")
              .split(" = ");
            const [left, right] = dest.split(", ");
            acc.graphs[src] = {
              left,
              right,
            };
          }
          return acc;
        },
        {
          graphs: {},
        }
      );
  } catch (error) {
    console.log(error);
  }
};

const part1 = () => {
  try {
    const input = readInput();
    if (!input) throw new Error("Failed to parse input");

    const { graphs, instructions } = input;
    let curr = "AAA";

    let ctr = 0;
    while (curr !== "ZZZ") {
      for (const instruction of instructions) {
        if (instruction === "R") {
          curr = graphs[curr].right;
        } else {
          curr = graphs[curr].left;
        }
        ctr++;

        if (curr === "ZZZ") break;
      }
    }

    console.log("Part 1", ctr);
  } catch (error) {
    console.log(error);
  }
};

const gcd = (a, b) => {
  if (b == 0) return a;
  else return gcd(b, a % b);
};

const lcm = (a, b) => (a * b) / gcd(a, b);

const part2 = () => {
  try {
    const input = readInput();
    if (!input) throw new Error("Failed to parse input");

    const { graphs, instructions } = input;

    const cycles = [];
    for (const startingNode of Object.keys(graphs)) {
      if (!startingNode.includes("A")) continue;
      let ctr = 0;
      let curr = startingNode;

      while (!curr.includes("Z")) {
        for (const instruction of instructions) {
          if (instruction === "R") {
            curr = graphs[curr].right;
          } else {
            curr = graphs[curr].left;
          }
          ctr++;
          if (curr.includes("Z")) break;
        }
      }
      cycles.push(ctr);
    }

    let ans = cycles[0];
    for (let i = 1; i < cycles.length; i++) {
      ans = lcm(ans, cycles[i]);
    }

    console.log("Part 2", ans);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
