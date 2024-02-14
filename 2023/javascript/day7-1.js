/*
1. Sort the hands in order of strength
--
1. 32T3K 765 - one pair
2. KTJJT 220 - two pair
3. KK677 28  - two pair - K high.
4. T55J5 684 - three of a kind
5. QQQJA 483 - three of a kind - Q high.
--

  [ "32T3K", "765", 6 ], 
  [ "KTJJT", "220", 5 ], 
  [ "KK677", "28", 5 ], 
  [ "QQQJA", "483", 4 ],
  [ "T55J5", "684", 4 ]

2. Multiply bids in order of strength
765 * 1 + 220 * 2 + 28 * 3 + 684 * 4 + 483 * 5 = 6440

*/

const types = {
    "five-kind": 1,
    "four-kind": 2,
    "full-house": 3,
    "three-kind": 4,
    "two-pair": 5,
    "one-pair": 6,
    "high-card": 7
}

const cards = [
    "A", "K", "Q", "J", "T", "9", "8",
    "7", "6", "5", "4", "3", "2"
]

function countRanks(hand) {
    return hand.split("").reduce((acc, card) => {
        const rank = card[0];
        acc[rank] = (acc[rank] || 0) + 1;
        return acc;
    }, {});
}

function getType(hand) {

    const rankCounts = countRanks(hand);

    let isFiveOfAKind = false;
    let isFourOfAKind = false;
    let isThreeOfAKind = false;
    let isPair = false;
    let pairCount = 0;

    for (const rank in rankCounts) {
        if (rankCounts[rank] === 5) {
            isFiveOfAKind = true;
        }
        if (rankCounts[rank] === 4) {
            isFourOfAKind = true;
        } else if (rankCounts[rank] === 3) {
            isThreeOfAKind = true;
        } else if (rankCounts[rank] === 2) {
            isPair = true;
            pairCount++;
        }
    }

    if (isFiveOfAKind) {
        return 1
    }
    else if (isFourOfAKind) {
        return 2
    } else if (isThreeOfAKind && isPair) {
        return 3
    } else if (isThreeOfAKind) {
        return 4
    } else if (pairCount === 2) {
        return 5
    } else if (isPair) {
        return 6
    } else {
        return 7
    }
}

export function run(input) {

    return input.trim().split("\n").map(hand => (
        hand.split(" ")
    )).map(hand => {
        return [...hand, getType(hand[0])]
    }).toSorted((a, b) => {

        if (a[2] == b[2]) {

            let higherCard = false;

            for (let i = 0; i < a[0].length; i++) {

                if (cards.indexOf(a[0][i]) < cards.indexOf(b[0][i])) {
                    higherCard = true;
                    break;
                }

                if (cards.indexOf(a[0][i]) > cards.indexOf(b[0][i])) {
                    higherCard = false;
                    break;
                }
            }

            if (higherCard) {
                return 1
            } else {
                return -1
            }
        }

        return b[2] - a[2]
    }).map((hand, i) => {
        return hand[1] * (i + 1)
    }).reduce((a, b) => (a + b), 0)
}
