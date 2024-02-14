import { expect, test, describe } from "bun:test";
import { run } from './day2-1'
import { run as run2 } from './day2-2'
const file = Bun.file("../input/day2.txt");
const input = await file.text();

const testInput = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

describe("day 2", () => {
    test("part 1 - real input", () => {
        expect(run(input)).toBe(2720)
    });

    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(8)
    });

    test("part 2 - real input", () => {
        expect(run2(input)).toBe(71535)
    });

    test("part 2 - test input", () => {
        expect(run2(testInput)).toBe(2286)
    })
})