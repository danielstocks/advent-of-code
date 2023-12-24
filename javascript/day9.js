function getDiffs(sequence, step = 0) {
    const diffs = [];
    let allZero = true;
    for (var i = 1; i < sequence[step].length; i++) {
        let diff = sequence[step][i] - sequence[step][i - 1]
        diffs.push(diff)
        if (diff !== 0) {
            allZero = false
        }
    }
    if (allZero) {
        return [...sequence, diffs]
    }
    return getDiffs([...sequence, diffs], step + 1)
}

function extrapolate(diff) {
    let newDiff = [...diff]
    newDiff[newDiff.length - 1] = [...newDiff[newDiff.length - 1], 0]
    for (var i = newDiff.length - 2; i >= 0; i--) {
        newDiff[i] = [
            ...newDiff[i],
            newDiff[i + 1][newDiff[i].length - 1] + newDiff[i][newDiff[i].length - 1]
        ]
    }
    return newDiff[0][newDiff[0].length - 1]
}

export function run(input) {
    return input.trim("")
        .split("\n")
        .map((n) => (n.split(" ").map(parseFloat)))
        .reduce((prev, next) => (
            prev + extrapolate(getDiffs([next]))
        ), 0)
}