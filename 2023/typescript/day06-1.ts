export function run(input: string) {
  const [times, distances] = input
    .trim()
    .replace(/\s\s+/g, " ")
    .split("\n")
    .map((row) => row.split(": ")[1].split(" ").map(parseFloat));

  return times
    .map((time, timeIndex) =>
      [...Array(time).keys()].filter(
        (speed) => (time - speed) * speed > distances[timeIndex]
      )
    )
    .reduce((a, b) => a * b.length, 1);
}
