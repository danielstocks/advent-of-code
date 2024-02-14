import { expect, test, describe } from "bun:test";
import { run } from './day10-1'
import { run as run2 } from './day10-2'
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

const part2testInput = `
...........
.S-------7.
.|F-----7|.
.||.....||.
.||.....||.
.|L-7.F-J|.
.|..|.|..|.
.L--J.L--J.
...........
`

const part2testInput2 = `
.F----7F7F7F7F-7....
.|F--7||||||||FJ....
.||.FJ||||||||L7....
FJL7L7LJLJ||LJ.L-7..
L--J.L7...LJS7F-7L7.
....F-J..F7FJ|L7L7L7
....L7.F7||L7|.L7L7|
.....|FJLJ|FJ|F7|.LJ
....FJL-7.||.||||...
....L---J.LJ.LJLJ...
`

const part2testInput3 = `
FF7FSF7F7F7F7F7F---7
L|LJ||||||||||||F--J
FL-7LJLJ||||||LJL-77
F--JF--7||LJLJ7F7FJ-
L---JF-JLJ.||-FJLJJ7
|F|F-JF---7F7-L7L|7|
|FFJF7L7F-JF7|JL---7
7-L-JL7||F7|L7F-7F7|
L.L7LFJ|||||FJL7||LJ
L7JLJL-JLJLJL--JLJ.L
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

    test("part 2 - test input", () => {
        //expect(run2(part2testInput)).toBe(4)
    });

    test("part 2 - test input 2", () => {
        //expect(run2(part2testInput2)).toBe(8)
    });

    test("part 2 - test input 3", () => {
        //expect(run2(part2testInput3)).toBe(10)
    });
})