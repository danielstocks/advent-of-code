
const file = Bun.file("../input/day3.txt");
const text = await file.text();


var testInput = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..
`

const testInput2 = `
12.......*..
+.........34
.......-12..
..78........
..*....60...
78.........9
.5.....23..$
8...90*12...
............
2.2......12.
.*.........*
1.1..503+.56
`

const testInput3 = `
.......5......
..7*..*.....4*
...*13*......9
.......15.....
..............
..............
..............
..............
..............
..............
21............
...*9.........
`
const testInput4 = `
....................
..-52..52-..52..52..
..................-.
`

const testInput5 = `
100
200

`

const testInput6 = `
........
.24.1434
......*.
`

const testInput7 = `
......*.
.24..-4.
......*.
`

const testInput8 = `
.531..................%.../....911.....763..453..291.................+684..917..93....365..*.......48.........*834...545...#................
....*280....-919...365.............115.........*....=.......................................213...../......120..........*............+......
803.......................788........&.........764.....................*895.315........402......................824.....949....679..243.....
`


/* 
Check if number has surrounding symbol:
- Row above (-1) start -1, end + 1
- Same row (0) start -1, end + 1
- Row below (+1) start -1, end + 1

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

function isSymbol(input) {
    return input !== "." && isNaN(parseInt(input))
}


function hasAdjacentSymbol(line, start, end, lines) {

    let numberOfAdjacentSymbols = 0;

    let currentLineScan = line - 1;
    let endLineScan = line + 1;
    while (currentLineScan <= endLineScan) {

        let currentCharScan = start - 1;
        let endCharScan = end + 2
        while (currentCharScan < endCharScan) {

            if (currentCharScan > -1 && currentLineScan > -1 && currentLineScan < lines.length) {
                var char = lines[currentLineScan][currentCharScan]

                //console.log("scanning line", currentLineScan, "scanning char", currentCharScan, "character", char);

                if (char && isSymbol(char)) {
                    //console.log(char)
                    return true;
                }
            }
            currentCharScan++;
        }
        currentLineScan++;
    }
}

function run(input) {

    var lines = input.trim("").split("\n").map((x) => {
        return x.split("")
    })

    //console.log(lines);

    var numberIndex = []
    //let totalNumberCount = 0;

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
                //totalNumberCount++
                charIndex += count
            }
        }
    }

   //console.log(totalNumberCount);

    // Iterate through number index
    numberIndex = numberIndex.filter((number) => {

        const line = number[0];
        const start = number[1];
        const end = number[2]

        const check = hasAdjacentSymbol(line, start, end, lines);
        console.log("number", number, "has adjacent symbol?", check ? "yes" : "no")
        return check;
    })

    return numberIndex.reduce((prev, current) => { return prev + parseInt(current[3]) }, 0)
}

/*
console.log("Result:", run(testInput), "Expected:", 4361);
console.log("Result:", run(testInput2), "Expected:", 925);
console.log("Result:", run(testInput3), "Expected:", 62);
console.log("Result:", run(testInput4), "Expected:", 156);
console.log("Result:", run(testInput5), "Expected:", 0);
console.log("Result:", run(testInput6), "Expected:", 4);
console.log("Result:", run(testInput7), "Expected:", 1434);
console.log("Result:", run(testInput8), "Expected:", 8249);
*/


console.log("Result:", run(text), "Expected:", 527446);

