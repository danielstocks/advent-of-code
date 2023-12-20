import { expect, test, describe } from "bun:test";
import { run } from './day8'
const file = Bun.file("../input/day8.txt");
const input = await file.text();

const testInput = `
RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)
`

const testInput2 = `
LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)
`


describe("day 8", () => {
    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(2)
    });

    test("part 1 - test input 2", () => {
        expect(run(testInput2)).toBe(6)
    });

    test("part 1 - input", () => {
        expect(run(input)).toBe(19199)
    });
})