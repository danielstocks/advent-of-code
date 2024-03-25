type pos = [number, number];
type grid = string[][];

const points: {
  [key: string]: pos;
} = {
  n: [1, 0],
  e: [0, 1],
  s: [-1, 0],
  w: [0, -1],
};

const tilePoints: {
  [key: string]: pos[];
} = {
  "|": [points.s, points.n],
  "-": [points.e, points.w],
  F: [points.s, points.e],
  J: [points.n, points.w],
  "7": [points.s, points.w],
  L: [points.n, points.e],
  S: [points.n, points.e, points.s, points.w],
  ".": [],
};

// Note: this "accidently" only works because we are passing arrays by reference
function intersectArraysOfArrays(arr1: pos[], arr2: pos[]) {
  return arr1.filter((item) => {
    return arr2.includes(item);
  });
}

function diffArraysOfArrays(arr1: pos[], arr2: pos[]) {
  const setArr2 = new Set(arr2.map((item) => JSON.stringify(item)));
  return arr1.filter((item) => !setArr2.has(JSON.stringify(item)));
}

function getStartingPosition(grid: grid): pos {
  for (var rowIndex = 0; rowIndex < grid.length; rowIndex++) {
    let row = grid[rowIndex];
    for (var colIndex = 0; colIndex < row.length; colIndex++) {
      let col = grid[rowIndex][colIndex];
      if (col === "S") {
        return [rowIndex, colIndex];
      }
    }
  }
  throw new Error("Starting position not found");
}

function getPipePath(grid: grid, startingPosition: pos) {
  let currentPosition = startingPosition;
  let direction: pos = [0, 0];
  let pipePath: pos[] = [];

  // Run loop until we are back at starting position.
  // For each iteration path find by checking if it's
  // possible to move north, east, south or west
  // while keeping track of direction we came from
  // so we don't go back and forth
  do {
    pipePath.push([currentPosition[0], currentPosition[1]]);

    let [rowIndex, colIndex] = currentPosition;

    let possibleDirections = diffArraysOfArrays(
      tilePoints[grid[rowIndex][colIndex]],
      [direction]
    );

    if (
      rowIndex > 0 &&
      intersectArraysOfArrays(possibleDirections, [points.n]).length &&
      intersectArraysOfArrays(tilePoints[grid[rowIndex - 1][colIndex]], [
        points.s,
      ]).length
    ) {
      direction = points.s;
      currentPosition = [rowIndex - 1, colIndex];
    } else if (
      intersectArraysOfArrays(possibleDirections, [points.e]).length &&
      intersectArraysOfArrays(tilePoints[grid[rowIndex][colIndex + 1]], [
        points.w,
      ]).length
    ) {
      direction = points.w;
      currentPosition = [rowIndex, colIndex + 1];
    } else if (
      rowIndex < grid.length - 1 &&
      intersectArraysOfArrays(possibleDirections, [points.s]).length &&
      intersectArraysOfArrays(tilePoints[grid[rowIndex + 1][colIndex]], [
        points.n,
      ]).length
    ) {
      direction = points.n;
      currentPosition = [rowIndex + 1, colIndex];
    } else if (
      intersectArraysOfArrays(possibleDirections, [points.w]).length &&
      intersectArraysOfArrays(tilePoints[grid[rowIndex][colIndex - 1]], [
        points.e,
      ]).length
    ) {
      direction = points.e;
      currentPosition = [rowIndex, colIndex - 1];
    }
  } while (
    !(
      currentPosition[0] === startingPosition[0] &&
      currentPosition[1] === startingPosition[1]
    )
  );

  return pipePath;
}

// Figure out what kind of pipe the starting pipe is "S" is.
// and replace it in grid with the actual pipe character
function replaceStartingTile(
  grid: grid,
  pipePath: pos[],
  startingPosition: pos
) {
  let startingPipe = "?";

  let prevTile: pos = [
    startingPosition[0] - pipePath[pipePath.length - 1][0],
    startingPosition[1] - pipePath[pipePath.length - 1][1],
  ];

  let nextTile: pos = [
    startingPosition[0] - pipePath[1][0],
    startingPosition[1] - pipePath[1][1],
  ];

  for (let tile in tilePoints) {
    if (
      intersectArraysOfArrays(tilePoints[tile], [prevTile, nextTile]).length ===
      2
    ) {
      startingPipe = tile;
      break;
    }
  }
  return grid.map((row) =>
    row.map((char) => char.replaceAll("S", startingPipe))
  );
}

function getTilesOutsidePipe(grid: grid, pipePath: pos[]) {
  let outside: pos[] = [];

  grid.forEach((row, rowIndex) => {
    let within = false;
    let up = false;

    row.map((char, colIndex) => {
      if (char == "|") {
        within = !within;
      } else if ("LF".includes(char)) {
        up = char == "L";
      } else if ("7J".includes(char)) {
        if (char != (up ? "J" : "7")) {
          within = !within;
        }
        up = false;
      }

      if (!within) {
        outside.push([rowIndex, colIndex]);
      }
    });
  });

  return diffArraysOfArrays(outside, pipePath);
}

function getCleanGrid(grid: grid, pipePath: pos[]) {
  return grid.map((row, rowIndex) =>
    row.map((col, colIndex) => {
      let newChar = ".";
      pipePath.forEach((tile) => {
        if (tile[0] == rowIndex && tile[1] == colIndex) {
          newChar = col;
        }
      });
      return newChar;
    })
  );
}

export function run(input: string) {
  let grid = input
    .trim()
    .split("\n")
    .map((row) => {
      return row.split("");
    });

  const startingPosition = getStartingPosition(grid);
  const pipePath = getPipePath(grid, startingPosition);
  const cleanGrid = getCleanGrid(
    replaceStartingTile(grid, pipePath, startingPosition),
    pipePath
  );
  const outside = getTilesOutsidePipe(cleanGrid, pipePath);

  return (
    cleanGrid.length * cleanGrid[0].length - (outside.length + pipePath.length)
  );
}
