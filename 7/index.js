const fs = require("fs");
const path = require("path");

const readInput = () => {
  try {
    return fs
      .readFileSync(path.join(__dirname, "./input.txt"), "utf8")
      .split("\r\n")
      .map((line) => ({
        cards: line.split(" ")[0],
        points: parseInt(line.split(" ")[1]),
      }));
  } catch (error) {
    console.log(error);
  }
};

const typeMap = {
  fiveOfAKind: 6,
  fourOfAKind: 5,
  fullHouse: 4,
  threeOfAKind: 3,
  twoPair: 2,
  onePair: 1,
  highCard: 0,
};

const part1FindType = (cards) => {
  const cardMap = {};

  for (const card of cards) {
    cardMap[card] = cardMap[card] ? cardMap[card] + 1 : 1;
  }

  const cardNumberMap = Object.values(cardMap).reduce((acc, curr) => {
    if (acc[curr]) acc[curr]++;
    else acc[curr] = 1;
    return acc;
  }, {});

  if (cardNumberMap[5] === 1) return "fiveOfAKind";
  else if (cardNumberMap[4] === 1) return "fourOfAKind";
  else if (cardNumberMap[3] === 1 && cardNumberMap[2] === 1) return "fullHouse";
  else if (cardNumberMap[3] === 1 && cardNumberMap[1] === 2)
    return "threeOfAKind";
  else if (cardNumberMap[2] === 2) return "twoPair";
  else if (cardNumberMap[2] === 1) return "onePair";
  else if (cardNumberMap[1] === 5) return "highCard";

  return "highCard";
};

const part1CardMap = {
  A: 12,
  K: 11,
  Q: 10,
  J: 9,
  T: 8,
  9: 7,
  8: 6,
  7: 5,
  6: 4,
  5: 3,
  4: 2,
  3: 1,
  2: 0,
};

const part1SortFn = (a, b) => {
  const typeA = part1FindType(a.cards),
    typeB = part1FindType(b.cards);

  if (typeMap[typeA] < typeMap[typeB]) return -1;
  else if (typeMap[typeA] > typeMap[typeB]) return 1;

  for (let i = 0; i < 5; i++) {
    if (part1CardMap[a.cards[i]] < part1CardMap[b.cards[i]]) {
      return -1;
    } else if (part1CardMap[a.cards[i]] > part1CardMap[b.cards[i]]) {
      return 1;
    }
  }

  return 0;
};

const part1 = () => {
  try {
    const sets = readInput();
    if (!sets) throw new Error("Failed to parse input");
    const sortedSets = sets.slice().sort(part1SortFn);
    const sum = sortedSets.reduce(
      (acc, set, idx) => acc + set.points * (idx + 1),
      0
    );
    console.log("Part 1", sum);
  } catch (error) {
    console.log(error);
  }
};

const part2FindType = (cards) => {
  const cardMap = {};

  const cardsFilter = cards.replaceAll("J", "");
  for (const card of cardsFilter) {
    cardMap[card] = cardMap[card] ? cardMap[card] + 1 : 1;
  }

  const cardNumberMap = Object.values(cardMap).reduce((acc, curr) => {
    if (acc[curr]) acc[curr]++;
    else acc[curr] = 1;
    return acc;
  }, {});

  const numOfJ = 5 - cardsFilter.length;
  if (numOfJ === 5) return "fiveOfAKind";

  if (numOfJ > 0) {
    const currHighest = Object.keys(cardNumberMap)
      .sort((a, b) => parseInt(b) - parseInt(a))
      .map(Number)[0];

    cardNumberMap[currHighest]--;
    cardNumberMap[currHighest + numOfJ] = cardNumberMap[currHighest + numOfJ]
      ? cardNumberMap[currHighest + numOfJ] + 1
      : 1;
  }

  if (cardNumberMap[5] === 1) return "fiveOfAKind";
  else if (cardNumberMap[4] === 1) return "fourOfAKind";
  else if (cardNumberMap[3] === 1 && cardNumberMap[2] === 1) return "fullHouse";
  else if (cardNumberMap[3] === 1 && cardNumberMap[1] === 2)
    return "threeOfAKind";
  else if (cardNumberMap[2] === 2) return "twoPair";
  else if (cardNumberMap[2] === 1) return "onePair";
  else if (cardNumberMap[1] === 5) return "highCard";

  return "highCard";
};

const part2CardMap = {
  A: 12,
  K: 11,
  Q: 10,
  T: 9,
  9: 8,
  8: 7,
  7: 6,
  6: 5,
  5: 4,
  4: 3,
  3: 2,
  2: 1,
  J: 0,
};

const part2SortFn = (a, b) => {
  const typeA = part2FindType(a.cards),
    typeB = part2FindType(b.cards);

  if (typeMap[typeA] < typeMap[typeB]) return -1;
  else if (typeMap[typeA] > typeMap[typeB]) return 1;

  for (let i = 0; i < 5; i++) {
    if (part2CardMap[a.cards[i]] < part2CardMap[b.cards[i]]) {
      return -1;
    } else if (part2CardMap[a.cards[i]] > part2CardMap[b.cards[i]]) {
      return 1;
    }
  }
  return 0;
};

const part2 = () => {
  try {
    const sets = readInput();
    if (!sets) throw new Error("Failed to parse input");

    const sortedSets = sets.slice().sort(part2SortFn);
    const sum = sortedSets.reduce(
      (acc, set, idx) => acc + set.points * (idx + 1),
      0
    );
    console.log("Part 2", sum);
  } catch (error) {
    console.log(error);
  }
};

part1();
part2();
