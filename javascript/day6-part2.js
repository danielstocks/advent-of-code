export function run(input) {

    const [time, currentRecordDistance] = input
        .trim()
        .replace(/\s\s+/g, '')
        .split("\n").map(
            row => parseFloat(row.split(":")[1])
        );

    return [...Array(time).keys()].filter(speed => {
        return (time - speed) * speed > currentRecordDistance
    }).length
}