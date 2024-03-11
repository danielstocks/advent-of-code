// Refactor to use "Set.prototype.difference()"
// and Set.prototype./intersection()

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

const x: {
  [key: string]: [number, number][];
} = {
  "|": [
    [-1, 0],
    [1, 0],
  ],
  "-": [
    [0, -1],
    [0, 1],
  ],
  F: [
    [-1, 0],
    [0, -1],
  ],
  J: [
    [1, 0],
    [0, 1],
  ],
  "7": [
    [-1, 0],
    [0, 1],
  ],
  L: [
    [1, 0],
    [0, -1],
  ],
};

function intersectArraysOfArrays(arr1: number[][], arr2: number[][]) {
  const setArr2 = new Set(arr2.map((item) => JSON.stringify(item)));
  return arr1.filter((item) => setArr2.has(JSON.stringify(item)));
}

function diffArraysOfArrays(
  arr1: [number, number][],
  arr2: [number, number][]
) {
  const setArr2 = new Set(arr2.map((item) => JSON.stringify(item)));
  return arr1.filter((item) => !setArr2.has(JSON.stringify(item)));
}

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

function getTilePath(tiles: string[][], startingPosition: [number, number]) {
  let currentPosition = startingPosition;
  let direction = "";
  let path: [number, number][] = [];

  while (
    !(
      currentPosition[0] === startingPosition[0] &&
      currentPosition[1] === startingPosition[1] &&
      path.length !== 0
    )
  ) {
    path.push([currentPosition[0], currentPosition[1]]);

    let [rowIndex, colIndex] = currentPosition;
    let directions = pipeDirections[tiles[rowIndex][colIndex]];

    if (
      directions.includes("north") &&
      rowIndex > 0 &&
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
  let tiles = input
    .trim()
    .split("\n")
    .map((row) => {
      return row.split("");
    });

  const startingPosition = getStartingPosition(tiles);
  const path = getTilePath(tiles, startingPosition);

  // Figure out what kind of tile "S" is.
  let nextTile = startingPosition.map(
    (element, index) => element - path[1][index]
  );
  let prevTile = startingPosition.map(
    (element, index) => element - path[path.length - 1][index]
  );

  let s = "?";

  for (let y in x) {
    if (intersectArraysOfArrays(x[y], [prevTile, nextTile]).length === 2) {
      s = y;
      break;
    }
  }

  // Set "S" to what s is
  tiles = tiles.map((row) => row.map((char) => char.replaceAll("S", s)));

  // Clean up garbage pipes
  tiles = tiles.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      let r = ".";
      path.forEach((tile) => {
        if (tile[0] == rowIndex && tile[1] == colIndex) {
          r = col;
        }
      });
      return r;
    })
  );

  //console.log(path);
  //console.log(tiles.map((row) => row.join("")).join("\n"));
  //console.log("\n");

  let outside: [number, number][] = [];

  tiles.forEach((row, rowIndex) => {
    let within = false;
    let up = false;

    row.map((ch, colIndex) => {
      if (ch == "|") {
        within = !within;
      } else if (ch == "-") {
        // pass
      } else if ("LF".includes(ch)) {
        up = ch == "L";
      } else if ("7J".includes(ch)) {
        if (ch != (up ? "J" : "7")) {
          within = !within;
        }
        up = false;
      } else if (ch == ".") {
        // pass
      } else {
        throw new Error(`unexpected character (horizontal): ${ch}`);
      }

      if (!within) {
        outside.push([rowIndex, colIndex]);
      }
    });
  });

  //console.log("outside", outside);
  //console.log("path", path);

  outside = diffArraysOfArrays(outside, path);

  //console.log("\n");

  // tiles.forEach((row, rowIndex) => {
  //   row.forEach((col, colIndex) => {
  //     let o = intersectArraysOfArrays([[rowIndex, colIndex]], outside);
  //     process.stdout.write(o.length ? "#" : ".");
  //   });
  //   process.stdout.write("\n");
  // });
  //
  return tiles.length * tiles[0].length - (outside.length + path.length);
}
