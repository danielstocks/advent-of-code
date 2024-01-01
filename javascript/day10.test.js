import { expect, test, describe } from "bun:test";
import { run } from './day10'
//import { run as run2 } from './day10-part2'
const file = Bun.file("../input/day10.txt");
const input = await file.text();

const testInput = `
.....
.S-7.
.|.|.
.L-J.
.....
`

const testInput2 = `
7-F7-
.FJ|7
SJLL7
|F--J
LJ.LJ
`

describe("day 10", () => {
    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(4)
    });

    test("part 1 - test input2", () => {
        expect(run(testInput2)).toBe(8)
    });

    test("part 1 - input", () => {
       expect(run(input)).toBe(6690)
    });
})