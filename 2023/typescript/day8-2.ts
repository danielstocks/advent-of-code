// Function to calculate the Greatest Common Divisor (GCD) using Euclidean algorithm
function getGreatestCommonDivisoderOf(a: number, b: number) {
  if (b === 0) {
    return a;
  }
  return getGreatestCommonDivisoderOf(b, a % b);
}

// Function to calculate the Least Common Multiple (LCM) of an array of numbers
function getLeastCommonMultipleOf(numbers: number[]) {
  if (numbers.length === 0) {
    return 1;
  }
  let result = numbers[0];
  for (let i = 1; i < numbers.length; i++) {
    result =
      (result * numbers[i]) / getGreatestCommonDivisoderOf(result, numbers[i]);
  }
  return result;
}

export function run(input: string) {
  // Parse instructions and L = 0, R = 1 for easier array access later on.
  const instructions = input
    .trim()
    .replaceAll("L", "0")
    .replaceAll("R", "1")
    .split("\n")[0];

  // Parse and create nodes
  const nodes: { [key: string]: [string, string] } = {};
  input
    .trim()
    .split("\n")
    .slice(2)
    .forEach((node) => {
      const paths = node
        .replace(/[\s=(),]+/g, " ")
        .trim()
        .split(" ");
      nodes[paths[0]] = [paths[1], paths[2]];
    });

  let destinations = Object.keys(nodes)
    .filter(function (node) {
      return node[2] === "A";
    })
    .map((destination) => {
      let totalSteps = 0;
      let currentStep = 0;
      let next = destination;

      while (true) {
        next = nodes[next][parseFloat(instructions[currentStep])];
        totalSteps++;
        currentStep++;

        if (next[2] == "Z") {
          break;
        }

        if (currentStep >= instructions.length) {
          currentStep = 0;
        }
      }

      return totalSteps;
    });

  return getLeastCommonMultipleOf(destinations);
}
