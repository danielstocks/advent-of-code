function getWinningNumbers(card) {
    const [winninNumbers, playerNumbers] = card
    return playerNumbers.filter((number) =>
        winninNumbers.indexOf(number) !== -1
    )
}

export function run(input) {

    let x = 0;

    function drilling(originalCards, newCards) {

        if (newCards.length == 0) {
            return
        }
        x += newCards.length


        newCards.forEach((card, i) => {
            const winningNumbers = getWinningNumbers(card)
            if (winningNumbers.length == 0) return;
            const index = originalCards.indexOf(card);
            const nextNewCards = originalCards.slice(index + 1, winningNumbers.length + index + 1)
            drilling(originalCards, nextNewCards)

        });
    }

    const cards = input.trim("").split("\n").map(card => {
        return card.split(/[:\|]+/).slice(1).map(numbers => (
            numbers.replace(/^\s+|\s+$|\s+(?=\s)/g, '').split(" ").map(str => parseInt(str, 10))
        ))
    })

    drilling(cards, cards)

    return x
}