import { expect, test, describe } from "bun:test";
import { run } from "./day01-2";

const file = Bun.file("../input/day01.txt");
const input = await file.text();

const testInput = `
two1nine
eightwothree
abcone2threexyz
xtwone3four
4nineeightseven2
zoneight234
7pqrstsixteen
`;

describe("day 1 part 2", () => {
  test("real input", () => {
    expect(run(input)).toBe(53855);
  });

  test("test input", () => {
    expect(run(testInput)).toBe(281);
  });
});
