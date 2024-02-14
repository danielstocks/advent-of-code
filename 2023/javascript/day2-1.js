export function run(input) {
    let sum = 0;

    // Iterate through each game
    const data = input.trim("").split("\n").map((value, gameIndex) => {

        const redValues = []
        const greenValues = []
        const blueValues = []

        // Iterate through each set
        value.split(":").slice(1)[0].split(";").forEach((value) => {

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

