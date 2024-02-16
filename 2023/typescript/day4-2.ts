type cards = number[][][];

function getWinningCards(cards: cards) {
  return cards.map((card) => {
    const [winninNumbers, playerNumbers] = card;
    const matches = playerNumbers.filter(
      (number: number) => winninNumbers.indexOf(number) !== -1
    );
    card[2] = matches;
    return card;
  });
}

export function run(input: string) {
  const cards = input
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
    });

  const winningCardsWithNumbers = getWinningCards(cards);

  // Recursive function to count the number of "copies" of cards won
  function countCardCopies(newCards: cards, count: number): number {
    if (newCards.length == 0) {
      return count;
    }
    count += newCards.length;
    newCards.forEach((card) => {
      const index = cards.indexOf(card);
      const winningNumbers = winningCardsWithNumbers[index][2];
      if (winningNumbers.length == 0) return;
      const nextNewCards = cards.slice(
        index + 1,
        winningNumbers.length + index + 1
      );
      count = countCardCopies(nextNewCards, count);
    });
    return count;
  }

  return countCardCopies(cards, 0);
}
