import { expect, test, describe } from "bun:test";
import { run } from './day6'
import { run as run2 } from './day6-part2'
const file = Bun.file("../input/day6.txt");
const input = await file.text();

const testInput = `
Time:      7  15   30
Distance:  9  40  200
`

describe("day 6", () => {

    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(288)
    });

    test("part 1 - input", () => {
        expect(run(input)).toBe(281600)
    });

    test("part 2 - test input", () => {
        expect(run2(testInput)).toBe(71503)
    })

    test("part 2 - input", () => {
        expect(run2(input)).toBe(33875953)
    })
})