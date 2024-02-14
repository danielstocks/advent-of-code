function isNumber(input) {
    return !isNaN(parseInt(input))
}

function isSymbol(input) {
    return input !== "." && isNaN(parseInt(input))
}


function hasAdjacentSymbol(line, start, end, lines) {

    let currentLineScan = line - 1;
    let endLineScan = line + 1;
    while (currentLineScan <= endLineScan) {

        let currentCharScan = start - 1;
        let endCharScan = end + 2
        while (currentCharScan < endCharScan) {

            if (currentCharScan > -1 && currentLineScan > -1 && currentLineScan < lines.length) {
                var char = lines[currentLineScan][currentCharScan]

                if (char && isSymbol(char)) {
                    return true;
                }
            }
            currentCharScan++;
        }
        currentLineScan++;
    }
}

export function run(input) {

    var lines = input.trim().split("\n").map((x) => {
        return x.split("")
    })

    var numberIndex = []

    // Build number index
    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {

        var chars = lines[lineIndex]
        for (let charIndex = 0; charIndex < chars.length; charIndex++) {
            if (isNumber(chars[charIndex])) {

                let fullNumber = ""
                let count = 0;

                while (isNumber(chars[charIndex + count])) {

                    const numberCount = chars[charIndex + count];
                    fullNumber += numberCount;
                    count++;
                }

                numberIndex.push([lineIndex, charIndex, charIndex + (count - 1), fullNumber])
                charIndex += count
            }
        }
    }

    // Iterate through number index
    numberIndex = numberIndex.filter((number) => {

        const line = number[0];
        const start = number[1];
        const end = number[2]

        const check = hasAdjacentSymbol(line, start, end, lines);

        return check;
    })

    return numberIndex.reduce((prev, current) => { return prev + parseInt(current[3]) }, 0)
}