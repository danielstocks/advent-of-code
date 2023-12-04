const file = Bun.file("../input/day2.txt");
const text = await file.text();

const demoText = `
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green
`

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
}).forEach((game) => {
    sum += game[0] * game[1] * game[2]
})

console.log(sum)