export function run(input) {
    let sum = 0;

    // Iterate through each game
    const data = input.trim("").split("\n").map((value, gameIndex) => {

        const redValues = []
        const greenValues = []
        const blueValues = []

        // Iterate through each set
        value.split(":").slice(1)[0].split(";").forEach((value, setIndex) => {

            // Iterate through each color
            value.trim("").split(", ").forEach(color => {

                if (color.includes("red")) {
                    redValues.push(parseInt(color))
                }
                if (color.includes("green")) {
                    greenValues.push(parseInt(color))
                }
                if (color.includes("blue")) {
                    blueValues.push(parseInt(color))
                }
            })
        })

        return [
            Math.max(...redValues),
            Math.max(...greenValues),
            Math.max(...blueValues)
        ]
    }).forEach((game, index) => {

        if (game[0] <= 12 && game[1] <= 13 && game[2] <= 14) {
            sum += (index + 1)
        }
    })
    return sum
}


/*
# Thinking
--

Rules:
--
With 12 red cubes, 13 green cubes, and 14 blue cubes, 
games 1, 2, and 5 would have been possible
Sum: 8
--

Solution:
--
Step 1: Parse text, create array of games, sets, and colors (RGB)
[
    [[4,1,0],[0,2,2],[3,6,0]]
    [[6, 1], [3, 2], [1, 2]]
]

Step 2: Select max value from each array.
[
    4,2,6,
    1,3,4
    20,13,6
    14,3,15
    6,3,2
]

Step 3: Check which games has numbers that are less or equal to:
[12, 13, 14]
*/