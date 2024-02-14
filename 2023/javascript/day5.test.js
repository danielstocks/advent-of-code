import { expect, test, describe } from "bun:test";
import { run } from './day5-1'
import { run as run2 } from './day5-2'
const file = Bun.file("../input/day5.txt");
const input = await file.text();

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`

describe("day 5", () => {



    test("part 1 - test input", () => {
        expect(run(testInput)).toBe(35)
    });

    test("part 1 - input", () => {
        expect(run(input)).toBe(309796150)
    });


    test("part 2 - test input", () => {
        expect(run2(testInput)).toBe(46)
    });

    test("part 2 - input", () => {
        expect(run2(input)).toBe(50716416)
    });


})