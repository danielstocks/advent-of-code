import { expect, test, describe } from "bun:test";
import { run } from './day1'
import { run as run2 } from './day1-part2'
const file = Bun.file("../input/day1.txt");
const input = await file.text();

const testInputPart1 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`

const testInputPart2 = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`

describe("day 1", () => {
    test("part 1 - real input", () => {
        expect(run(input)).toBe(54634)
    });

    test("part 1 - test input", () => {
        expect(run(testInputPart1)).toBe(142)
    });

    test("part 2 - real input", () => {
        expect(run2(input)).toBe(53855)
    });

    test("part 2 - test input", () => {
        expect(run2(testInputPart2)).toBe(281)
    });
})