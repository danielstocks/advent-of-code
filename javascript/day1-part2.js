// Right answer is: 53855
const file = Bun.file("../input/day1.txt");
const text = await file.text();

function convertStringToNumbers(input) {
    const numberMap = {
        "zero": "0",
        "one": "1",
        "two": "2",
        "three": "3",
        "four": "4",
        "five": "5",
        "six": "6",
        "seven": "7",
        "eight": "8",
        "nine": "9"
    };

    let output = "";
    let i = 0;

    while (i < input.length) {
        if (!isNaN(input[i])) {
            // Directly append the digit and move to the next character
            output += input[i];
            i++;
            continue;
        }

        let found = false;

        // Check for each number word
        for (const [word, number] of Object.entries(numberMap)) {
            if (input.startsWith(word, i)) {
                output += number;
                i += word.length - 1; // Move back one position after the number word
                found = true;
                break;
            }
        }

        // If no match is found, increment to the next character
        if (!found) {
            i++;
        }
    }

    return output;
}

const cleanText = text.split("\n").map(convertStringToNumbers)

function getNumbers(input) {
    if (input.length === 0) {
        return 0;
    }
    var numbers = input.split("").filter((currentValue) => {
        if (!isNaN(parseInt(currentValue))) {
            return currentValue;
        } else {
            return false
        }
    })
    var sum = numbers[0] + numbers[numbers.length - 1]
    //console.log(sum)
    return parseInt(sum)
}

const sum = cleanText.reduce((prev, current) => {
    return prev + getNumbers(current)
}, 0)

console.log(sum)