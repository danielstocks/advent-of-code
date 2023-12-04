const file = Bun.file("../input/day2.txt");
const text = await file.text();

const demoText = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

/*

Rules:
--
With 12 red cubes, 13 green cubes, and 14 blue cubes, 
games 1, 2, and 5 would have been possible
Sum: 8
--

Solution:
--
Step 1 convert array to:
[
    // R, G, B
    // Game 1 (three sets)
    [[4,1,0],[0,2,2],[3,6,0]]
    // Game 5 (two sets)
    [[6, 1], [3, 2], [1, 2]]
]

Step 2: convert array to:
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
let sum = 0;

// Iterate through each game
const data = text.trim("").split("\n").map((value, gameIndex) => {

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

console.log(sum)