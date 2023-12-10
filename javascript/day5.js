
function createMaprange(input) {

    return input.split("\n").slice(1).map((row) => {
        const [source, destination, range] = row.split(" ").map((text) => parseInt(text, 10))
        return [source, destination, range];
    })
}

function seekAndFind(start, end, find) {

    if(find < start || find > end) {
        return -1;
    }

    var index = 0;

    for (var s = start; s < end; s++) {
        if (find == s) {
            return index
        }
        index++
    }
    return -1
}

function getDestinationFromSource(sourceToFind, map) {

    let sourceIndexFound = -1
    let rowIndexFound = - 1

    map.every((row, rowIndex) => {
        //console.time('test');
        sourceIndexFound = seekAndFind(row[1], row[1] + row[2], sourceToFind)
        //console.timeEnd('test');
        if (sourceIndexFound !== -1) {
            rowIndexFound = rowIndex
            return false;
        } else {
            return true;
        }
    })

    if (rowIndexFound !== -1) {

        const row = map[rowIndexFound]
        const start = row[0];
        const end = row[0] + row[2]
        let index = 0
        let destinationValue;

        for (var s = start; s < end; s++) {
            if (sourceIndexFound == index) {
                destinationValue = s;
            }
            index++
        }

        return destinationValue;

    } else {
        return sourceToFind
    }

}

function getSeedLocation(maps, seed) {
    let soil = getDestinationFromSource(seed, maps["seed-soil"]);
    let fertilizer = getDestinationFromSource(soil, maps["soil-fertilizer"]);
    let water = getDestinationFromSource(fertilizer, maps["fertilizer-water"]);
    let light = getDestinationFromSource(water, maps["water-light"]);
    let temperature = getDestinationFromSource(light, maps["light-temperature"]);
    let humidity = getDestinationFromSource(temperature, maps["temperature-humidity"]);
    let location = getDestinationFromSource(humidity, maps["humidity-location"]);
    console.log("found location:", location)
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