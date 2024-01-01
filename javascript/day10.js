const pipeDirections = {
    ".": [],
    "|": ["south", "north"],
    "-": ["east", "west"],
    "F": ["south", "east"],
    "J": ["north", "west"],
    "7": ["south", "west"],
    "L": ["north", "east"],
    "S": ["north", "east", "south", "west"]
}

function getDirectionsToCheck(pipe, prevDirection, rowIndex, tiles) {
    return pipeDirections[pipe].filter((direction) => {
        if (direction === "north") {
            if (prevDirection === "south" || rowIndex < 0) {
                return false;
            }
        }

        if (direction === "south") {
            if (prevDirection === "north" || rowIndex > (tiles.length - 1)) {
                return false;
            }
        }

        if (direction === "east") {
            if (prevDirection === "west") {
                return false;
            }
        }

        if (direction === "west") {
            if (prevDirection === "east") {
                return false;
            }
        }

        return direction
    })
}

function getStartingPosition(tiles) {
    let startingPosition = false;
    for (var rowIndex = 0; rowIndex < tiles.length; rowIndex++) {
        let row = tiles[rowIndex]
        for (var colIndex = 0; colIndex < row.length; colIndex++) {
            let col = tiles[rowIndex][colIndex]
            if (col === "S") {
                startingPosition = [rowIndex, colIndex]
                break;
            }
        }
        if (startingPosition) { break; }
    }
    return startingPosition
}

export function run(input) {

    // Create grid
    const tiles = input.trim().split("\n").map(row => {
        return row.split("")
    })

    let startingPosition = getStartingPosition(tiles);
    let currentPosition = false
    let prevDirection = false;
    let i = 0;

    while (true) {

        i++;
        let position = currentPosition || startingPosition
        let [rowIndex, colIndex] = position;

        // Check if we are back at start
        if (currentPosition[0] == startingPosition[0] && currentPosition[1] == startingPosition[1]) {
            break;
        }

        let directionsToCheck = getDirectionsToCheck(tiles[rowIndex][colIndex], prevDirection, rowIndex, tiles)

        if (directionsToCheck.includes("north")) {
            const northPipe = tiles[rowIndex - 1][colIndex];
            if (pipeDirections[northPipe].includes("south")) {
                prevDirection = "north"
                currentPosition = [rowIndex - 1, colIndex]
                continue;
            }
        }

        if (directionsToCheck.includes("east")) {
            const eastPipe = tiles[rowIndex][colIndex + 1];
            if (pipeDirections[eastPipe].includes("west")) {
                prevDirection = "east"
                currentPosition = [rowIndex, colIndex + 1]
                continue;
            }
        }

        // Check south
        if (directionsToCheck.includes("south")) {
            const southPipe = tiles[rowIndex + 1][colIndex];
            if (pipeDirections[southPipe].includes("north")) {
                prevDirection = "south"
                currentPosition = [rowIndex + 1, colIndex]
                continue;
            }
        }

        // Check west
        if (directionsToCheck.includes("west")) {
            const westPipe = tiles[rowIndex][colIndex - 1];
            if (pipeDirections[westPipe].includes("east")) {
                prevDirection = "west"
                currentPosition = [rowIndex, colIndex - 1]
                continue;
            }
        }
    }

    return Math.floor((i) / 2)
}