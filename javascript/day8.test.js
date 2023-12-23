import { expect, test, describe } from "bun:test";
import { run } from './day8'
import { run as run2 } from './day8-part2'
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

const part2TestInput = `
LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)
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

    test("part 2 - test input", () => {
        expect(run2(part2TestInput)).toBe(6)
    });

    test("part 2 - input", () => {
        expect(run2(input)).toBe(13663968099527)
    });

})