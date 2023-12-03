const file = Bun.file("../input/day1.txt");
const text = await file.text();

function getNumbers(input:string) {
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
    return parseInt(sum)
}

const sum = text.split("\n").reduce((prev, current) => {
    return prev + getNumbers(current)
}, 0)

// SPOILER ALERT:
// Right answer is: 54634
console.log(sum)