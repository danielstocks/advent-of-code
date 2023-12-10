export function run(input) {

    let [inputs, ...blocks] = input.trim().split("\n\n");

    inputs = inputs.split(": ")[1].split(" ").map(parseFloat)

    let seeds = []

    for (var i = 0; i < inputs.length; i += 2) {
        seeds.push([inputs[i], inputs[i] + inputs[i + 1]]);
    }

    blocks.forEach((block) => {

        const ranges = []

        block.split("\n").slice(1).forEach(line => {
            ranges.push(line.split(" ").map(parseFloat))
        })

        const matches = []

        while (seeds.length > 0) {

            let match = false
            let [start, end] = seeds.pop()

            for (let [destination, source, range] of ranges) {

                let overlapStart = Math.max(start, source)
                let overlapEnd = Math.min(end, source + range)

                if (overlapStart < overlapEnd) {

                    match = [
                        overlapStart - source + destination,
                        overlapEnd - source + destination
                    ]
                    console.log(match)

                    if (overlapStart > start) {
                        seeds.push([start, overlapStart])
                    }
                    if (end > overlapEnd) {
                        seeds.push([overlapEnd, end])
                    }
                    break;
                }
            }
            if (match) {
                matches.push(match)
            } else {
                matches.push([start, end])
            }
        }
        seeds = matches
    })

    return Math.min(...seeds.map(seed => seed[0]));
}
