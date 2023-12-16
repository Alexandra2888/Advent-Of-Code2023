//PART 1

// const fs = require("fs");

// const input = fs.readFileSync("./input.txt", "utf8");

// const tilt = (graph, dx, dy) => {
//   for (
//     let row = dx === 1 ? graph.length - 1 : 0;
//     0 <= row && row < graph.length;
//     row += dx !== 0 ? -dx : 1
//   ) {
//     for (
//       let col = dy === 1 ? graph[row].length - 1 : 0;
//       0 <= col && col < graph[row].length;
//       col += dy !== 0 ? -dy : 1
//     ) {
//       if (graph[row][col] === "O") {
//         let [x, y] = [row, col];
//         while (
//           0 <= x + dx &&
//           x + dx < graph.length &&
//           0 <= y + dy &&
//           y + dy < graph[x + dx].length &&
//           graph[x + dx][y + dy] === "."
//         ) {
//           x += dx;
//           y += dy;
//         }
//         graph[row][col] = ".";
//         graph[x][y] = "O";
//       }
//     }
//   }
//   return graph;
// };

// const solve = (input) => {
//   let graph = input.split("\n").map((line) => line.split(""));
//   graph = tilt(graph, -1, 0);
//   let result = 0;
//   for (let row = 0; row < graph.length; row++) {
//     for (let col = 0; col < graph[row].length; col++) {
//       if (graph[row][col] === "O") result += graph.length - row;
//     }
//   }
//   return result;
// };

// console.log(solve(input));

//PART 2

const fs = require("fs");

const input = fs.readFileSync("./input.txt", "utf8");
const TOTAL_CYCLES = 1e9;

const tilt = (graph, dx, dy) => {
  for (
    let row = dx === 1 ? graph.length - 1 : 0;
    0 <= row && row < graph.length;
    row += dx !== 0 ? -dx : 1
  ) {
    for (
      let col = dy === 1 ? graph[row].length - 1 : 0;
      0 <= col && col < graph[row].length;
      col += dy !== 0 ? -dy : 1
    ) {
      if (graph[row][col] === "O") {
        let [x, y] = [row, col];
        while (
          0 <= x + dx &&
          x + dx < graph.length &&
          0 <= y + dy &&
          y + dy < graph[x + dx].length &&
          graph[x + dx][y + dy] === "."
        ) {
          x += dx;
          y += dy;
        }
        graph[row][col] = ".";
        graph[x][y] = "O";
      }
    }
  }
  return graph;
};

const solve = (input) => {
  let graph = input.split("\n").map((line) => line.split(""));
  const previousStates = new Map();
  for (let spinCycles = 0; spinCycles < TOTAL_CYCLES; spinCycles++) {
    const graphState = graph.map((line) => line.join("")).join("\n");
    if (previousStates.has(graphState)) {
      const stateCycleLength = spinCycles - previousStates.get(graphState);
      const remainingSpinCycles = TOTAL_CYCLES - spinCycles;
      spinCycles +=
        Math.floor(remainingSpinCycles / stateCycleLength) * stateCycleLength;
    }
    previousStates.set(graphState, spinCycles);
    graph = tilt(tilt(tilt(tilt(graph, -1, 0), 0, -1), 1, 0), 0, 1);
  }
  let result = 0;
  for (let row = 0; row < graph.length; row++) {
    for (let col = 0; col < graph[row].length; col++) {
      if (graph[row][col] === "O") result += graph.length - row;
    }
  }
  return result;
};

console.log(solve(input));
