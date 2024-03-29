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

function convertStringToNumbers(input) {

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
                // Move back one position after the number word
                // to find combined number words like "eightwo"
                i += word.length - 1;
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

function getFirstAndLastNumber(input) {
    var numbers = input.split("")
    var sum = numbers[0] + numbers[numbers.length - 1]
    return parseInt(sum)
}

export function run(input) {
    return input.trim().split("\n").map(convertStringToNumbers).reduce((prev, current) => {
        return prev + getFirstAndLastNumber(current)
    }, 0)
}