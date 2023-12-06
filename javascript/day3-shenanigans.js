const file = Bun.file("../input/day3.txt");
const text = await file.text();

var linesAndChars = text.trim("").split("\n").map((x) => {
    return x.split("")
})

let frame = 0;

linesAndChars.forEach((line, lineIndex) => {

    line.forEach((char, charIndex) => {

        setTimeout(() => {

            console.clear()

            if (lineIndex > 1) {
                console.log(
                    linesAndChars[lineIndex - 2][charIndex - 2] || ".",
                    linesAndChars[lineIndex - 2][charIndex - 1] || ".",
                    linesAndChars[lineIndex - 2][charIndex] || ".",
                    linesAndChars[lineIndex - 2][charIndex + 1] || ".",
                    linesAndChars[lineIndex - 2][charIndex + 2] || "."
                )
            } else {
                console.log(". . . . .")
            }

            if (lineIndex > 0) {
                console.log(
                    linesAndChars[lineIndex - 1][charIndex - 2] || ".",
                    linesAndChars[lineIndex - 1][charIndex - 1] || ".",
                    linesAndChars[lineIndex - 1][charIndex] || ".",
                    linesAndChars[lineIndex - 1][charIndex + 1] || ".",
                    linesAndChars[lineIndex - 1][charIndex + 2] || "."
                )
            } else {
                console.log(". . . . .")
            }

            console.log(
                linesAndChars[lineIndex][charIndex - 2] || ".",
                linesAndChars[lineIndex][charIndex - 1] || ".",
                '\x1b[36m%s\x1b[0m', linesAndChars[lineIndex][charIndex] || ".",
                linesAndChars[lineIndex][charIndex + 1] || ".",
                linesAndChars[lineIndex][charIndex + 2] || "."
            )

            if ((lineIndex + 1) < linesAndChars.length) {
                console.log(
                    linesAndChars[lineIndex + 1][charIndex - 2] || ".",
                    linesAndChars[lineIndex + 1][charIndex - 1] || ".",
                    linesAndChars[lineIndex + 1][charIndex] || ".",
                    linesAndChars[lineIndex + 1][charIndex + 1] || ".",
                    linesAndChars[lineIndex + 1][charIndex + 2] || "."
                )
            } else {
                console.log(". . . . .")
            }

            if ((lineIndex + 2) < linesAndChars.length) {
                console.log(
                    linesAndChars[lineIndex + 2][charIndex - 2] || ".",
                    linesAndChars[lineIndex + 2][charIndex - 1] || ".",
                    linesAndChars[lineIndex + 2][charIndex] || ".",
                    linesAndChars[lineIndex + 2][charIndex + 1] || ".",
                    linesAndChars[lineIndex + 2][charIndex + 2] || "."
                )
            } else {
                console.log(". . . . .")
            }

            console.log("\n")

        }, frame * 100)

        frame++;

    })
})
