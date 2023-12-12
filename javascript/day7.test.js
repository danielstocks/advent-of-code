import { expect, test, describe } from "bun:test";
import { run } from './day7'
const file = Bun.file("../input/day7.txt");
const input = await file.text();

const testInput = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`

const testInput2 = `
2345A 1
Q2KJJ 13
Q2Q2Q 19
T3T3J 17
T3Q33 11
2345J 3
J345A 2
32T3K 5
T55J5 29
KK677 7
KTJJT 34
QQQJA 31
JJJJJ 37
JAAAA 43
AAAAJ 59
AAAAA 61
2AAAA 23
2JJJJ 53
JJJJ2 41
`

describe("day 7", () => {

    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(6440)
    });

    
    test("part 1 - input", () => {
        expect(run(input)).toBe(253933213)
    });
    

    test("part 1 - test input 2", () => {
        expect(run(testInput2)).toBe(6592)
    });
    
})