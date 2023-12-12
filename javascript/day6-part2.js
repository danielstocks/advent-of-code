function getWinningCases(time, distance) {

    let delta = Math.sqrt(time * time - (4 * distance));

    let minValue = (time - delta) / 2;
    let maxValue = (time + delta) / 2;

    if (minValue - Math.floor(minValue) === 0) {
        minValue += 1;
    } else {
        minValue = Math.ceil(minValue);
    }

    if (maxValue - Math.floor(maxValue) === 0) {
        maxValue -= 1;
    } else {
        maxValue = Math.floor(maxValue);
    }

    return Math.floor(maxValue - minValue) + 1;
}


export function run(input) {

    const [time, currentRecordDistance] = input
        .trim()
        .replace(/\s\s+/g, '')
        .split("\n").map(
            row => parseFloat(row.split(":")[1])
        );

    return getWinningCases(time, currentRecordDistance)
}