import { expect, test, describe } from "bun:test";
import { run } from './day3-1'
import { run as run2 } from './day3-2'
const file = Bun.file("../input/day3.txt");
const input = await file.text();

var testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const testInput2 = `
12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56
`

const testInput3 = `
.......5......
..7*..*.....4*
...*13*......9
.......15.....
..............
..............
..............
..............
..............
..............
21............
...*9.........
`
const testInput4 = `
....................
..-52..52-..52..52..
..................-.
`

const testInput5 = `
100
200

`

const testInput6 = `
........
.24.1434
......*.
`

const testInput7 = `
......*.
.24..-4.
......*.
`

const testInput8 = `
.531..................%.../....911.....763..453..291.................+684..917..93....365..*.......48.........*834...545...#................
....*280....-919...365.............115.........*....=.......................................213...../......120..........*............+......
803.......................788........&.........764.....................*895.315........402......................824.....949....679..243.....
`


describe("day 3", () => {
    test("part 1 - real input", () => {
        expect(run(input)).toBe(527446)
    });

    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(4361)
    });

    test("part 1 - test input 2", () => {
        expect(run(testInput2)).toBe(925)
    });

    test("part 1 - test input 3", () => {
        expect(run(testInput3)).toBe(62)
    });

    test("part 1 - test input 4", () => {
        expect(run(testInput4)).toBe(156)
    });

    test("part 1 - test input 5", () => {
        expect(run(testInput5)).toBe(0)
    });

    test("part 1 - test input 6", () => {
        expect(run(testInput6)).toBe(1434)
    });

    test("part 1 - test input 7", () => {
        expect(run(testInput7)).toBe(4)
    });

    test("part 1 - test input 8", () => {
        expect(run(testInput8)).toBe(8249)
    });

    test("part 2 - real input", () => {
        expect(run2(input)).toBe(73201705)
    });

    test("part 2 - test input", () => {
        expect(run2(testInput)).toBe(467835)
    })
})