let text = Fs.readFile("../input/day1.txt")

let getNumbers = input => {
  if Js.String.length(input) === 0 {
    0
  } else {
    let numbers =
      input
      ->Js.String2.split("")
      ->Js.Array2.filter(value => {
        !Js.Float.isNaN(Js.Float.fromString(value))
      })

    let part1 = switch numbers[0] {
    | None => ""
    | Some(value) => value
    }

    let part2 = switch numbers[Js.Array2.length(numbers) - 1] {
    | None => ""
    | Some(value) => value
    }

    let sum = part1 ++ part2

    switch Belt.Int.fromString(sum) {
    | None => 0
    | Some(value) => value
    }
  }
}

let sum =
  text
  ->Js.String2.split("\n")
  ->Js.Array2.reduce((prev, current) => {
    prev + getNumbers(current)
  }, 0)

Js.log(sum)
