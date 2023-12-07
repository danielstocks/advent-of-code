export function run(input) {
    return input.trim("").split("\n").reduce((prev, current) => {
        return prev + getNumbers(current)
    }, 0)
}

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
    return parseInt(sum)
}