function createRange(start, end) {

    const range = [];
    for (let i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

function createMaprange(input) {

    return input.split("\n").slice(1).map((row) => {

        const text = row.split(" ").map((text) => parseInt(text, 10))


        return {
            sources: createRange(text[1], text[1] + text[2] - 1),
            destinations: createRange(text[0], text[0] + text[2] - 1)
        }
    })
}

function getSeedLocation(maps, seed) {

    console.log(seed)
    console.log(maps["seed-soil"])
}


export function run(input) {

    const data = input.trim().split("\n\n");

    const seeds = data[0].split(" ").slice(1)

    const maps = {
        "seed-soil": createMaprange(data[1]),
        "soil-fertilizer": createMaprange(data[2]),
        "fertilizer-water": createMaprange(data[3]),
        "water-light": createMaprange(data[4]),
        "light-to-temperature": createMaprange(data[5]),
        "temperature-humidity": createMaprange(data[6]),
        "humidity-location": createMaprange(data[7])
    }

    const location = getSeedLocation(maps, seeds[0])

    console.log(location);

    return "not implemented"
}

/* 

Thinking / Rationale
--------------------
1. Extract seeds - Done
2. Extract maps - Done 
3. Fill in the full ranges in maps - Done
4. Connect Seed to location through maps 
   Seed => Soil => fertilizer => Water => Light => Temperature => Humidity => Location
5. Get lowest location numbers

*/