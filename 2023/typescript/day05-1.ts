export function run(input: string) {
  let [seeds, ...blocks] = input.trim().split("\n\n");

  let newSeeds = seeds.split(": ")[1].split(" ").map(parseFloat);

  blocks.forEach((block) => {
    const ranges: number[][] = [];
    block
      .split("\n")
      .slice(1)
      .forEach((line) => {
        ranges.push(line.split(" ").map(parseFloat));
      });

    const matches = [];

    for (let seed of newSeeds) {
      let match = 0;
      for (let [destination, source, range] of ranges) {
        if (source <= seed && seed < source + range) {
          match = seed - source + destination;
          break;
        }
      }
      if (match !== 0) {
        matches.push(match);
      } else {
        matches.push(seed);
      }
    }

    newSeeds = matches;
  });

  return Math.min(...newSeeds);
}
