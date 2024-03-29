function getDiffs(sequence: number[][], step = 0) {
  const diffs = [];
  let allZero = true;
  for (var i = 1; i < sequence[step].length; i++) {
    let diff = sequence[step][i] - sequence[step][i - 1];
    diffs.push(diff);
    if (diff !== 0) {
      allZero = false;
    }
  }
  if (allZero) {
    return [...sequence, diffs];
  }
  return getDiffs([...sequence, diffs], step + 1);
}

function extrapolate(diff: number[][]) {
  let newDiff = [...diff];
  newDiff[newDiff.length - 1] = [0, ...newDiff[newDiff.length - 1]];
  for (var i = newDiff.length - 2; i >= 0; i--) {
    newDiff[i] = [newDiff[i][0] - newDiff[i + 1][0], ...newDiff[i]];
  }
  return newDiff[0][0];
}

export function run(input: string) {
  return input
    .trim()
    .split("\n")
    .map((n) => n.split(" ").map(parseFloat))
    .reduce((prev, next) => prev + extrapolate(getDiffs([next])), 0);
}
