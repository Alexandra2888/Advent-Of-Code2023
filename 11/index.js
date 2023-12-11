const fs = require('fs');
const path = require('path');

const readInput = () => {
  try {
    const rows = fs
      .readFileSync(path.join(__dirname, './input.txt'), 'utf-8')
      .trim()
      .split('\r\n');

    const r = rows.length,
      c = rows[0].length;

    const galaxies = [];
    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (rows[i][j] === '#') galaxies.push([i, j]);
      }
    }

    const expandedRows = rows.reduce((acc, curr, idx) => {
      if (curr.split('').every((ch) => ch === '.')) acc.push(idx);
      return acc;
    }, []);

    const expandedCols = [];

    for (let i = 0; i < c; i++) {
      let shouldExpand = true;
      for (let j = 0; j < r; j++) {
        if (rows[j][i] === '#') {
          shouldExpand = false;
          break;
        }
      }
      if (shouldExpand) expandedCols.push(i);
    }

    return {
      rows,
      galaxies,
      expandedRows,
      expandedCols,
    };
  } catch (error) {
    console.log(error);
  }
};

const part1 = () => {
  try {
    const input = readInput();
    if (!input) throw new Error('Failed to parse input');

    const { expandedCols, expandedRows, galaxies } = input;

    let ans = 0;
    for (let i = 0; i < galaxies.length; i++) {
      const [row, col] = galaxies[i];
      for (let j = i; j < galaxies.length; j++) {
        const [row2, col2] = galaxies[j];
        let total = Math.abs(row2 - row) + Math.abs(col2 - col);
        for (const expandedRow of expandedRows) {
          if (
            Math.min(row, row2) <= expandedRow &&
            expandedRow <= Math.max(row, row2)
          ) {
            total++;
          }
        }
        for (const expandedCol of expandedCols) {
          if (
            Math.min(col, col2) <= expandedCol &&
            expandedCol <= Math.max(col, col2)
          ) {
            total++;
          }
        }
        ans += total;
      }
    }

    console.log('Part 1', ans);
  } catch (error) {
    console.log(error);
  }
};

const part2 = () => {
  try {
    const input = readInput();
    if (!input) throw new Error('Failed to parse input');
    const { expandedCols, expandedRows, galaxies } = input;

    let ans = 0;
    for (let i = 0; i < galaxies.length; i++) {
      const [row, col] = galaxies[i];
      for (let j = i; j < galaxies.length; j++) {
        const [row2, col2] = galaxies[j];
        let total = Math.abs(row2 - row) + Math.abs(col2 - col);
        for (const expandedRow of expandedRows) {
          if (
            Math.min(row, row2) <= expandedRow &&
            expandedRow <= Math.max(row, row2)
          ) {
            total += 1e6 - 1;
          }
        }
        for (const expandedCol of expandedCols) {
          if (
            Math.min(col, col2) <= expandedCol &&
            expandedCol <= Math.max(col, col2)
          ) {
            total += 1e6 - 1;
          }
        }
        ans += total;
      }
    }

    console.log('Part 2', ans);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
