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
    }).forEach((game) => {
        sum += game[0] * game[1] * game[2]
    })

    return sum
}