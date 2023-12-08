function getWinningCards(cards) {
    return cards.map(card => {
        // Filter out winning numbers and calculate score
        const [winninNumbers, playerNumbers] = card
        const matches = playerNumbers.filter((number) =>
            winninNumbers.indexOf(number) !== -1
        )
        card[2] = matches;
        return card
    })
}

export function run(input) {

    const cards = input.trim("").split("\n").map(card => {
        return card.split(/[:\|]+/).slice(1).map(numbers => (
            numbers.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(" ").map(str => parseInt(str, 10))
        ))
    })

    const winningCardsWithNumbers = getWinningCards(cards);

    let x = 0;

    function drill(newCards) {
        if (newCards.length == 0) {
            return
        }
        x += newCards.length
        newCards.forEach((card, i) => {
            const index = cards.indexOf(card);
            const winningNumbers = winningCardsWithNumbers[index][2]
            if (winningNumbers.length == 0) return;
            const nextNewCards = cards.slice(index + 1, winningNumbers.length + index + 1)
            drill(nextNewCards)
        });
    }
    drill(cards)
    return x
}