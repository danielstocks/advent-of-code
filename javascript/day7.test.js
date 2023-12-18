import { expect, test, describe } from "bun:test";
import { run } from './day7'
import { getType, run as run2 } from './day7-part2'
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

const fiveOfkind = `
JJJJJ 1
AAAAA 2
JAAAA 3
AJAAA 4
AAJAA 5
AAAJA 6
AAAJA 7
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

    test("part 2 - test input", () => {
        expect(run2(testInput)).toBe(5905)
    });

    test("part 2 - test input 2", () => {
        expect(run2(testInput2)).toBe(6839)
    });
    
    test("part 2 - input", () => {
        expect(run2(input)).toBe(253473930)
    });
   

    describe("get type unit test", () => {


        test("five of a kind", () => {
            expect(getType("JJJJJ")).toBe(1)
            expect(getType("AAAAA")).toBe(1)
            expect(getType("JAAAA")).toBe(1)
            expect(getType("AJAAA")).toBe(1)
            expect(getType("AAJAA")).toBe(1)
            expect(getType("AAAJA")).toBe(1)
            expect(getType("AAAAJ")).toBe(1)
        })


        test("four of a kind", () => {
            expect(getType("AA8AA")).toBe(2)
            expect(getType("TTTT8")).toBe(2)
            expect(getType("JTTT8")).toBe(2)
            expect(getType("TJTT8")).toBe(2)
            expect(getType("TTJT8")).toBe(2)
            expect(getType("TTTJ8")).toBe(2)
            expect(getType("TTT8J")).toBe(2)
            expect(getType("T55J5")).toBe(2)
            expect(getType("KTJJT")).toBe(2)
            expect(getType("QQQJA")).toBe(2)
            expect(getType("QJJQ2")).toBe(2)
            expect(getType("JTJ55")).toBe(2)
            expect(getType("JJQJ4")).toBe(2)
            expect(getType("JJ2J9")).toBe(2)
        })


        test("full house", () => {
            expect(getType("23332")).toBe(3)
            expect(getType("J2233")).toBe(3)
            expect(getType("2J233")).toBe(3)
            expect(getType("22J33")).toBe(3)
            expect(getType("223J3")).toBe(3)
            expect(getType("2233J")).toBe(3)
            expect(getType("22333")).toBe(3)
            expect(getType("25J52")).toBe(3)
        })


        test("three of a kind", () => {
            expect(getType("AJKJ4")).toBe(4)
            expect(getType("TTT98")).toBe(4)
            expect(getType("JTT98")).toBe(4)
            expect(getType("TJT98")).toBe(4)
            expect(getType("TTJ98")).toBe(4)
            expect(getType("TT9J8")).toBe(4)
            expect(getType("TT98J")).toBe(4)
            expect(getType("T9T8J")).toBe(4)
            expect(getType("T98TJ")).toBe(4)
            expect(getType("T98JT")).toBe(4)
            expect(getType("TQJQ8")).toBe(4)
        })

        test("two pair", () => {
            expect(getType("23432")).toBe(5)
            expect(getType("KK677")).toBe(5)
            expect(getType("KK677")).toBe(5)
        })

        test("one pair", () => {
            expect(getType("32T3K")).toBe(6)
            expect(getType("A23A4")).toBe(6)
            expect(getType("32T3K")).toBe(6)
            expect(getType("J2345")).toBe(6)
            expect(getType("2J345")).toBe(6)
            expect(getType("23J45")).toBe(6)
            expect(getType("234J5")).toBe(6)
            expect(getType("2345J")).toBe(6)
            expect(getType("5TK4J")).toBe(6)
        })

        test("high card", () => {
            expect(getType("23456")).toBe(7)
        })
        

    })
})