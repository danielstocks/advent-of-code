export function run(input) {

    let [seeds, ...blocks] = input.trim().split("\n\n");

    seeds = seeds.split(": ")[1].split(" ").map(parseFloat)

    blocks.forEach((block) => {

        const ranges = []
        block.split("\n").slice(1).forEach(line => {
            ranges.push(line.split(" ").map(parseFloat))
        })

        const matches = []

        for (let seed of seeds) {

            let match = false
            for (let [destination, source, range] of ranges) {
                if (source <= seed && seed < source + range) {
                    match = seed - source + destination;
                    break;
                }
            }
            if (match) {
                matches.push(match)
            } else {
                matches.push(seed)
            }
        }

        seeds = matches
    })

    return Math.min(...seeds)
}
