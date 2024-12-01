import { expect, test, describe } from "bun:test";
import { run } from "./day01-1";

const file = Bun.file("../input/day01.txt");
const input = await file.text();

const testInputPart1 = `
1abc2
pqr3stu8vwx
a1b2c3d4e5f
treb7uchet
`;

describe("day 1 part 1", () => {
  test("test input", () => {
    expect(run(testInputPart1)).toBe(142);
  });

  test("real input", () => {
    expect(run(input)).toBe(54634);
  });
});
