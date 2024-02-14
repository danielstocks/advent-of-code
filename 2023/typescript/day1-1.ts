function getNumbers(input: string) {
  if (input.length === 0) {
    return 0;
  }
  var numbers = input.split("").filter((currentValue) => {
    if (!isNaN(parseInt(currentValue))) {
      return currentValue;
    } else {
      return false;
    }
  });
  var sum = numbers[0] + numbers[numbers.length - 1];
  return parseInt(sum);
}

export function run(input: string) {
  const sum = input.split("\n").reduce((prev, current) => {
    return prev + getNumbers(current);
  }, 0);
  return sum;
}
