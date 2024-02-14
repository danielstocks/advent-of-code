export function run(input: string) {
  // Extract winning and player numbers and map into an array of cards
  return input
    .trim()
    .split("\n")
    .map((card) => {
      return card
        .split(/[:\|]+/)
        .slice(1)
        .map((numbers) =>
          numbers
            .replace(/^\s+|\s+$|\s+(?=\s)/g, "")
            .split(" ")
            .map((str) => parseInt(str, 10))
        );
    })
    .map((card) => {
      // Filter out winning numbers and calculate score
      const [winninNumbers, playerNumbers] = card;
      const matches = playerNumbers.filter(
        (number) => winninNumbers.indexOf(number) !== -1
      );
      return matches.length > 0 ? Math.pow(2, matches.length - 1) : 0;
    })
    .reduce((prev, current) => {
      return prev + current;
    }, 0);
}
