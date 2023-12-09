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
        console.log(text)

        return {
            sources: createRange(text[1], text[1] + text[2] - 1),
            destinations: createRange(text[0], text[0] + text[2] - 1)
        }
    })
}

function getDestinationFromSource(sourceToFind, map) {

    let matchRowIndex = -1;
    let matchSourceIndex = -1;


    map.forEach((row, rowIndex) => {
        row.sources.forEach((source, sourceIndex) => {
            if (sourceToFind === source) {
                matchRowIndex = rowIndex
                matchSourceIndex = sourceIndex
            }
        })
    })

    if (matchRowIndex == -1 || matchSourceIndex == -1) {
        return sourceToFind;
    }

    return map[matchRowIndex].destinations[matchSourceIndex]

}

function getSeedLocation(maps, seed) {

    let soil = getDestinationFromSource(seed, maps["seed-soil"]);
    let fertilizer = getDestinationFromSource(soil, maps["soil-fertilizer"]);
    let water = getDestinationFromSource(fertilizer, maps["fertilizer-water"]);
    let light = getDestinationFromSource(water, maps["water-light"]);
    let temperature = getDestinationFromSource(light, maps["light-temperature"]);
    let humidity = getDestinationFromSource(temperature, maps["temperature-humidity"]);
    let location = getDestinationFromSource(humidity, maps["humidity-location"]);

    console.log(
        "Seed", seed,
        ", soil", soil,
        ", fertilizer", fertilizer,
        ", water", water,
        ", light", light,
        ", temperature", temperature,
        ", humidity", humidity,
        ", location", location
    )

    return location
}


export function run(input) {

    

    const data = input.trim().split("\n\n");

    const seeds = data[0].split(" ").slice(1).map(seed => parseInt(seed, 10))

    const maps = {
        "seed-soil": createMaprange(data[1]),
        "soil-fertilizer": createMaprange(data[2]),
        "fertilizer-water": createMaprange(data[3]),
        "water-light": createMaprange(data[4]),
        "light-temperature": createMaprange(data[5]),
        "temperature-humidity": createMaprange(data[6]),
        "humidity-location": createMaprange(data[7])
    }

    return Math.min(...seeds.map(seed => getSeedLocation(maps, seed)))
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