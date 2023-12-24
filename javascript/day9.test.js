import { expect, test, describe } from "bun:test";
import { run } from './day9'
const file = Bun.file("../input/day9.txt");
const input = await file.text();

const testInput = `
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`

const testNegativeValues = `
-24 -26 -28 -30 -32 -34 -36 -38
0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45
`


describe("day 9", () => {

    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(114)
    });

    test("part 1 - test negative input", () => {
        expect(run(testNegativeValues)).toBe(74)
    });

    test("part 1 - input", () => {
        expect(run(input)).toBe(2043183816)
    });
})