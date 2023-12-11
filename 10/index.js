const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    const input = fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .split("\r\n");

    return input;
  } catch (error) {
    console.log(error);
  }
};

const directionsMap = {
  0: "top",
  1: "right",
  2: "bottom",
  3: "left",
};

const di = [-1, 0, 1, 0];
const dj = [0, 1, 0, -1];
const dList = ["SLJ|", "SLF-", "S7F|", "S7J-"];

const outOfBound = (i, j, r, c) => {
  return i < 0 || j < 0 || i >= r || j >= c;
};

const allowedDirections = {
  "|": [
    { from: "top", to: "bottom" },
    { from: "bottom", to: "top" },
  ],
  "-": [
    { from: "left", to: "right" },
    { from: "right", to: "left" },
  ],
  L: [
    { from: "bottom", to: "right" },
    { from: "left", to: "top" },
  ],
  J: [
    { from: "bottom", to: "left" },
    { from: "right", to: "top" },
  ],
  7: [
    { from: "right", to: "bottom" },
    { from: "top", to: "left" },
  ],
  F: [
    { from: "top", to: "right" },
    { from: "left", to: "bottom" },
  ],
};

const findDistances = (rows) => {
  const r = rows.length,
    c = rows[0].length;
  const visited = new Array(r).fill(0).map(() => new Array(c).fill(false));

  const distances = new Array(r).fill(0).map(() => new Array(c).fill(Infinity));

  let s = null;
  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (rows[i][j] === "S") {
        s = [i, j];
        break;
      }
    }
    if (s) break;
  }

  if (!s) throw new Error("No starting point");

  const q = [s];
  distances[s[0]][s[1]] = 0;

  while (q.length) {
    const [i, j] = q.shift();

    if (visited[i][j]) continue;
    visited[i][j] = true;
    for (let k = 0; k < 4; k++) {
      const ni = i + di[k],
        nj = j + dj[k];
      if (outOfBound(ni, nj, r, c)) continue;
      if (rows[ni][nj] === "." || rows[ni][nj] === "S") continue;
      if (visited[ni][nj]) continue;

      const dir = directionsMap[k];
      if (rows[i][j] === "S") {
        const allowedDirection = allowedDirections[rows[ni][nj]];
        if (
          allowedDirection[0].from === dir ||
          allowedDirection[1].from === dir
        ) {
          distances[ni][nj] = distances[i][j] + 1;
          q.push([ni, nj]);
          continue;
        }
      } else {
        const origins = allowedDirections[rows[i][j]];
        const destinations = allowedDirections[rows[ni][nj]];

        if (
          (origins[0].to === destinations[0].from && origins[0].to === dir) ||
          (origins[0].to === destinations[1].from && origins[0].to === dir) ||
          (origins[1].to === destinations[0].from && origins[1].to === dir) ||
          (origins[1].to === destinations[1].from && origins[1].to === dir)
        ) {
          distances[ni][nj] = distances[i][j] + 1;

          q.push([ni, nj]);
        }
      }
    }
  }
  return distances;
};

const part1 = () => {
  try {
    const rows = readInput();
    if (!rows) throw new Error("Failed to parse input");

    const distances = findDistances(rows);
    const ans = distances.reduce((acc, distance) => {
      const currMax = distance.reduce((acc, num) => {
        if (num === Infinity) return acc;
        acc = Math.max(acc, num);

        return acc;
      }, 0);

      if (currMax === Infinity) return acc;
      acc = Math.max(acc, currMax);
      return acc;
    }, 0);

    console.log("Part 1", ans);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const input = readInput();
    if (!input) throw new Error("Failed to parse input");

    const r = input.length;
    const c = input[0].length;
    const visited = new Array(r).fill(0).map(() => new Array(c).fill(false));

    let area = 0,
      tempI = 0,
      tempJ = 0;

    const dfs = (row, col) => {
      const stack = [{ row, col }];

      while (stack.length > 0) {
        const { row, col } = stack.pop();

        if (!visited[row][col]) {
          visited[row][col] = true;
          area += (tempI - row) * (tempJ + col);
          tempI = row;
          tempJ = col;

          for (let k = 0; k < 4; k++) {
            if (dList[k].includes(input[row][col])) {
              const nextI = row + di[k];
              const nextJ = col + dj[k];

              if (
                0 <= nextI &&
                nextI < r &&
                0 <= nextJ &&
                nextJ < c &&
                dList[k ^ 2].includes(input[nextI][nextJ])
              ) {
                stack.push({ row: nextI, col: nextJ });
              }
            }
          }
        }
      }
    };
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (input[i][j] === "S") {
          tempI = i;
          tempJ = j;
          dfs(i, j);
          area += (tempI - i) * (tempJ + j);
          const border = visited.reduce(
            (acc1, r) => acc1 + r.reduce((acc2, c) => acc2 + (c ? 1 : 0), 0),
            0
          );

          const ans = Math.abs(area) / 2 - border / 2 + 1;
          return console.log("Part 2", ans);
        }
      }
    }
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
