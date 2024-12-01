function isNumber(input: string) {
  return !isNaN(parseInt(input));
}

function isStar(input: string) {
  return input === "*";
}

function findAdjacentStarSymbols(
  line: number,
  start: number,
  end: number,
  lines: string[][]
): string {
  let result = [];
  let currentLineScan = line - 1;
  let endLineScan = line + 1;
  while (currentLineScan <= endLineScan) {
    let currentCharScan = start - 1;
    let endCharScan = end + 2;
    while (currentCharScan < endCharScan) {
      if (
        currentCharScan > -1 &&
        currentLineScan > -1 &&
        currentLineScan < lines.length
      ) {
        var char = lines[currentLineScan][currentCharScan];
        if (char && isStar(char)) {
          return currentLineScan + "-" + currentCharScan;
        }
      }
      currentCharScan++;
    }
    currentLineScan++;
  }
  return "";
}

type numberIndexItem = [number, number, number, string];

export function run(input: string) {
  var lines = input
    .trim()
    .split("\n")
    .map((x) => {
      return x.split("");
    });

  var numberIndex: numberIndexItem[] = [];

  // Build number index
  for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
    var chars = lines[lineIndex];
    for (let charIndex = 0; charIndex < chars.length; charIndex++) {
      if (isNumber(chars[charIndex])) {
        let fullNumber = "";
        let count = 0;

        while (isNumber(chars[charIndex + count])) {
          const numberCount = chars[charIndex + count];
          fullNumber += numberCount;
          count++;
        }

        numberIndex.push([
          lineIndex,
          charIndex,
          charIndex + (count - 1),
          fullNumber,
        ]);

        charIndex += count;
      }
    }
  }

  // Iterate through number index
  const output: { [key: string]: number[] } = {};
  numberIndex
    .map((number): { number: number; starPositions: string } => {
      const line = number[0];
      const start = number[1];
      const end = number[2];
      return {
        number: parseInt(number[3]),
        starPositions: findAdjacentStarSymbols(line, start, end, lines),
      };
    })
    .filter((number) => {
      return number.starPositions.length > 0;
    })
    .forEach((number) => {
      if (output[number.starPositions]) {
        output[number.starPositions].push(number.number);
      } else {
        output[number.starPositions] = [number.number];
      }
    });

  let sum = 0;

  Object.keys(output).forEach((key) => {
    if (output[key].length > 1) {
      sum += output[key].reduce((prev, current) => {
        return prev * current;
      }, 1);
    }
  });

  return sum;
}
