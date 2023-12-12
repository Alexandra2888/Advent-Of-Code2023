const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .split("\r\n");
  } catch (error) {
    console.log(error);
  }
};

const solve = (springs, groups) => {
  const dp = {};

  const countTotalArrangements = (i, j, k) => {
    const memoKey = `${i}.${j}.${k}`;
    if (dp[memoKey] !== undefined) return dp[memoKey];

    if (i === springs.length) {
      return (j === groups.length && k === 0) ||
        (j === groups.length - 1 && groups[j] === k)
        ? 1
        : 0;
    }

    let ans = 0;

    if (springs[i] === "#" || springs[i] === "?") {
      ans += countTotalArrangements(i + 1, j, k + 1);
    }

    if (
      (springs[i] === "." || springs[i] === "?") &&
      (k === 0 || (k > 0 && j < groups.length && groups[j] === k))
    ) {
      ans += countTotalArrangements(i + 1, k === 0 ? j : j + 1, 0);
    }

    dp[memoKey] = ans;
    return ans;
  };

  return countTotalArrangements(0, 0, 0);
};

const getAnswer = () => {
  try {
    const rows = readInput();
    if (!rows) throw new Error("Failed to parse input");

    const ans1 = rows.reduce(
      (acc, row) =>
        acc +
        solve(
          row.split(" ")[0].split(""),
          row.split(" ")[1].split(",").map(Number)
        ),
      0
    );

    console.log("Part 1", ans1);

    const ans2 = rows.reduce(
      (acc, row) =>
        acc +
        solve(
          new Array(5).fill(row.split(" ")[0]).join("?").split(""),
          new Array(5).fill(row.split(" ")[1]).join(",").split(",").map(Number)
        ),
      0
    );

    console.log("Part 2", ans2);
  } catch (error) {
    console.log(error);
  }
};

getAnswer();
