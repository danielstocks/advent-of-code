let input = File.read "../input/day04.txt"

let test_input = "
MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX
"

let reverse_string string = string
  |> String.to_seq
  |> List.of_seq
  |> List.rev
  |> List.to_seq
  |> String.of_seq

let reverse list = list |> List.map(fun string -> reverse_string string)

let regex = Re.(compile (seq [str "XMAS"]))

let count_xmas input = 
  Re.all regex input
  |> List.length

let sum list = list |> List.fold_left(fun acc current -> 
  acc + count_xmas(current)
) 0

let extract_vertical list =
  list |> List.mapi(fun index _ -> (
    list |> List.map(fun line -> String.get line index)
    |> List.to_seq
    |> String.of_seq
  )) 

let extract_diagonal data =
  let input = Array.of_list data in
  let size = List.length data * 2 in
  let diagonal = Array.make size [] in
  let inverted = Array.make size [] in
  for x = 0 to (size / 2 - 1) do 
    for y = 0 to (size / 2 - 1) do 
      let inv = x + (size / 2 - 1 - y) in
      let str = [(String.get input.(x) y |> String.make 1)]; in
      inverted.(inv) <- inverted.(inv) @ str;
      diagonal.(x+y) <- diagonal.(x+y) @ str;
    done;
  done;
  diagonal
    |> Array.append inverted
    |> Array.to_list
    |> List.map(fun list -> String.concat "" list)


let run data = 
  let input = data |> String.trim |> String.split_on_char '\n' in
  let horizontal = input |> sum in
  let horizontal_reversed = input |> reverse |> sum in
  let vertical = input |> extract_vertical |> sum in
  let vertical_reversed = input |> extract_vertical |> reverse |> sum in
  let diagonal = input |> extract_diagonal |> sum in
  let diagonal_reversed = input |> extract_diagonal |> reverse |> sum in
  horizontal + 
  horizontal_reversed + 
  vertical + 
  vertical_reversed + 
  diagonal + 
  diagonal_reversed

