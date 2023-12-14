const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    const grids = fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .replaceAll("\r", "")
      .split("\n\n")
      .map((grid) => grid.split("\n").map((row) => row.split("")));

    return grids;
  } catch (error) {
    console.log(error);
  }
};

const solve = () => {
  try {
    const grids = readInput();
    if (!grids) throw new Error("Failed to parse input");

    const ans = grids.reduce(
      (acc, grid) => {
        const r = grid.length,
          c = grid[0].length;

        for (let i = 0; i < c - 1; i++) {
          let ctr = 0;

          for (let j = 0; j < c; j++) {
            if (0 <= i - j && i - j < i + j + 1 && i + j + 1 < c) {
              for (let k = 0; k < r; k++) {
                if (grid[k][i - j] !== grid[k][i + j + 1]) ctr++;
              }
            }
          }

          acc[ctr] += ctr <= 1 ? i + 1 : 0;
        }

        for (let i = 0; i < r - 1; i++) {
          let ctr = 0;

          for (let j = 0; j < r; j++) {
            if (0 <= i - j && i - j < i + 1 + j && i + 1 + j < r) {
              for (let k = 0; k < c; k++) {
                if (grid[i - j][k] !== grid[i + 1 + j][k]) ctr++;
              }
            }
          }
          acc[ctr] += ctr <= 1 ? 100 * (i + 1) : 0;
        }
        return acc;
      },
      [0, 0]
    );

    console.log("Part 1", ans[0]);
    console.log("Part 2", ans[1]);
  } catch (error) {
    console.log(error);
  }
};

solve();
