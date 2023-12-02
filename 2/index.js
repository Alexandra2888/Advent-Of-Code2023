const { readFile } = require("fs");

////////////////////////////////////////////////////////////
// PART ONE
////////////////////////////////////////////////////////////
readFile("./input.txt", { encoding: "utf-8" }, (error, data) => {
  const games = data.split("\n");

  let result = 0;

  const max = {
    red: 12,
    green: 13,
    blue: 14,
  };

  games.forEach((game, index) => {
    const gameID = index + 1;
    let impossible = false;

    const sets = game.split(":")[1].split(";");

    sets.forEach((set) => {
      const colorsBySet = set.split(",");

      colorsBySet.forEach((colorInSet) => {
        const [quantity, color] = colorInSet.trim().split(" ");

        // Trigger impossible flag if quantity is bigger than maximum allowed
        if (max[color] < quantity) {
          impossible = true;
        }
      });
    });

    if (!impossible) {
      result += gameID;
    }
  });

  console.log(result);
});

////////////////////////////////////////////////////////////
// PART TWO
////////////////////////////////////////////////////////////
readFile("./input.txt", { encoding: "utf-8" }, (error, data) => {
  const games = data.split("\n");

  let result = 0;

  games.forEach((game) => {
    const min = {};

    const sets = game.split(":")[1].split(";");

    sets.forEach((set) => {
      const colorsBySet = set.split(",");

      colorsBySet.forEach((colorInSet) => {
        console.log(colorInSet);
        const [quantity, color] = colorInSet.trim().split(" ");

        // If no quantity for that color, add property to object
        // Else compare min number for that color with the quantity, replace is bigger
        if (!min[color]) {
          min[color] = Number(quantity);
        } else if (min[color] < Number(quantity)) {
          min[color] = Number(quantity);
        }
      });
    });

    const power = Object.values(min).reduce((number, acc) => number * acc, 1);
    result += power;
  });

  console.log(result);
});
