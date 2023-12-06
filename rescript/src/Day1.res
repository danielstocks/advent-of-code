let text = Fs.readFile("../input/day1.txt")

let getNumbers = input => {
  if Js.String.length(input) === 0 {
    0
  } else {
    let numbers =
      input
      ->String.split("")
      ->Array.filter(value => {
        switch Int.fromString(value) {
        | None => false
        | Some(_) => true
        }
      })

    let part1 = switch numbers[0] {
    | None => ""
    | Some(value) => value
    }

    let part2 = switch numbers[Array.length(numbers) - 1] {
    | None => ""
    | Some(value) => value
    }

    let sum = part1 ++ part2

    switch Int.fromString(sum) {
    | None => 0
    | Some(value) => value
    }
  }
}

let sum =
  text
  ->String.split("\n")
  ->Array.reduce(0, (prev, current) => {
    prev + getNumbers(current)
  })

Js.log(sum)
