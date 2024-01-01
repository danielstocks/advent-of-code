/* 

Check if number has surrounding * symbol:
- Row above (-1) start -1, end + 1
- Same row (0) start -1, end + 1
- Row below (+1) start -1, end + 1

Save position of star symbol on number

l = line, s=start, e=end, v=value

  l  s  e  v
-----------------     
[ 0, 0, 2, "467" ] => Check rows -1, 0, 1 | Chars: -1,0,1,2,3
[ 0, 5, 7, "114" ] => Check rows  1, 0, 1 | Chars:  4,5,6,7,8
[ 2, 2, 3, "35" ]  => Check rows  1, 2, 3 | Chars:  1,2,3,4

*/


function isNumber(input) {
    return !isNaN(parseInt(input))
}

function isStar(input) {
    return input === "*"
}


function findAdjacentStarSymbols(line, start, end, lines) {

    let result = []
    let currentLineScan = line - 1;
    let endLineScan = line + 1;
    while (currentLineScan <= endLineScan) {

        let currentCharScan = start - 1;
        let endCharScan = end + 2
        while (currentCharScan < endCharScan) {

            if (currentCharScan > -1 && currentLineScan > -1 && currentLineScan < lines.length) {
                var char = lines[currentLineScan][currentCharScan]
                if (char && isStar(char)) {
                    return currentLineScan + "-" + currentCharScan
                }
            }
            currentCharScan++;
        }
        currentLineScan++;
    }
    return result
}

export function run(input) {

    var lines = input.trim("").split("\n").map((x) => {
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
    numberIndex = numberIndex.map((number) => {
        const line = number[0];
        const start = number[1];
        const end = number[2]
        return {
            number: parseInt(number[3]),
            starPositions: findAdjacentStarSymbols(line, start, end, lines)
        }
    })

    numberIndex = numberIndex.filter((number) => {
        return number.starPositions.length > 0
    })

    const newShit = {}
    numberIndex.forEach((number) => {
        if (newShit[number.starPositions]) {
            newShit[number.starPositions].push(number.number)
        } else {
            newShit[number.starPositions] = [number.number]
        }
    })

    let sum = 0;

    Object.keys(newShit).forEach(key => {
        if (newShit[key].length > 1) {
            sum += newShit[key].reduce((prev, current) => {
                return prev * current
            }, 1)
        }
    })

    return sum;
}