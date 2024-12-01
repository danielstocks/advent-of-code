let input = File.read "../input/day00.txt"

let run _ = 
  input
  |> String.trim
  |> String.split_on_char '\n'
  |> List.length
