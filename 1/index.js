// AOC 2023 - Day 1

let input = require('fs').readFileSync('./input.txt').toString()

let lines = input.split('\n')
// #endregion

//  Part 1
let part1 = lines
    .map((line) => {
        let allNums = [...line].map((c) => Number(c)).filter(Boolean)
        return +`${allNums[0]}${allNums.slice(-1)}`
    })
    .reduce((a, b) => a + b, 0)

console.log('Part 1 Solution: ', part1)


// Part 2
let words = [
    'zero',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
]

let part2 = lines
    .map((line) => {
        let allNums = [...line]
            .map((c, i) => ({ val: Number(c), idx: i }))
            .filter(({ val }) => !isNaN(val))
        let allWords = words
            .map((word, i) => [
                { val: i, idx: line.indexOf(word) },
                { val: i, idx: line.lastIndexOf(word) },
            ])
            .flat()
            .filter(({ idx }) => idx !== -1)

        let all = [...allNums, ...allWords].sort((a, b) => a.idx - b.idx)
        return +`${all[0].val}${all.slice(-1)[0].val}`
    })
    .reduce((a, b) => a + b, 0)

console.log('Part 2 Solution: ' + part2)
