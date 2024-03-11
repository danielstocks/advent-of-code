const pipeDirections: {
  [key: string]: string[];
} = {
  ".": [],
  "|": ["south", "north"],
  "-": ["east", "west"],
  F: ["south", "east"],
  J: ["north", "west"],
  "7": ["south", "west"],
  L: ["north", "east"],
  S: ["north", "east", "south", "west"],
};

function getStartingPosition(tiles: string[][]): [number, number] {
  for (var rowIndex = 0; rowIndex < tiles.length; rowIndex++) {
    let row = tiles[rowIndex];
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      let col = tiles[rowIndex][colIndex];
      if (col === "S") {
        return [rowIndex, colIndex];
      }
    }
  }
  throw new Error("Starting position not found");
}

function getTilePath(tiles: string[][]) {
  let startingPosition = getStartingPosition(tiles);
  let currentPosition = startingPosition;
  let direction = "";
  let path = [];

  while (
    !(
      currentPosition[0] === startingPosition[0] &&
      currentPosition[1] === startingPosition[1] &&
      path.length !== 0
    )
  ) {
    path.push(currentPosition);

    let [rowIndex, colIndex] = currentPosition;
    let directions = pipeDirections[tiles[rowIndex][colIndex]];

    if (
      directions.includes("north") &&
      rowIndex > -1 &&
      direction !== "south" &&
      pipeDirections[tiles[rowIndex - 1][colIndex]].includes("south")
    ) {
      direction = "north";
      currentPosition = [rowIndex - 1, colIndex];
      continue;
    }

    if (
      directions.includes("east") &&
      direction !== "west" &&
      pipeDirections[tiles[rowIndex][colIndex + 1]].includes("west")
    ) {
      direction = "east";
      currentPosition = [rowIndex, colIndex + 1];
      continue;
    }

    if (
      directions.includes("south") &&
      rowIndex < tiles.length - 1 &&
      direction !== "north" &&
      pipeDirections[tiles[rowIndex + 1][colIndex]].includes("north")
    ) {
      direction = "south";
      currentPosition = [rowIndex + 1, colIndex];
      continue;
    }

    if (
      directions.includes("west") &&
      direction !== "east" &&
      pipeDirections[tiles[rowIndex][colIndex - 1]].includes("east")
    ) {
      direction = "west";
      currentPosition = [rowIndex, colIndex - 1];
      continue;
    }
  }

  return path;
}

export function run(input: string) {
  // Create grid of tiles
  const tiles = input
    .trim()
    .split("\n")
    .map((row) => {
      return row.split("");
    });

  const path = getTilePath(tiles);
  return Math.floor(path.length / 2);
}
