module Antinode = struct
  type t = int * int
  let compare (x1, y1) (x2, y2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then cmp_x else compare y1 y2
end
module Antinodes = Set.Make(Antinode)

let string_to_char_list s =
  List.init (String.length s) (String.get s)

let antinodes = Antinodes.empty

let within_bounds x y size =
  x > -1 && y > -1 && y < size && x < size 

let place_antinode (x1, y1, x2, y2) = 
  ((x1 - x2) + x1, (y1 - y2) + y1)

let run data = 
  let grid_lines = data |> String.trim |> String.split_on_char '\n' in
  let size = grid_lines |> List.length in
  let antennas = grid_lines 
    |> List.mapi(fun x line -> 
        line |> string_to_char_list |> List.mapi(fun y char ->
          if char = '.' then None else Some (x, y, char)
        )
     )
    |> List.flatten 
    |> List.filter_map (fun x -> x) in

  antennas
    |> List.map(fun antenna -> 
      let (x, y, char) = antenna in
      antennas
        |> List.filter(fun opposite -> (
          let (o_x, o_y, o_char) = opposite in
          char = o_char && (o_x <> x || o_y <> y)
        ))
        |> List.map(fun opposite ->
          let (o_x, o_y, _) = opposite in
          let list = match (place_antinode (x, y, o_x, o_y)) with
            | (x, y) when within_bounds x y size ->
                [(x, y)]
            | _ -> [] 
          in
          let list = match (place_antinode (o_x, o_y, x, y)) with
            | (x, y) when within_bounds x y size ->
                list @ [(x, y)]
            | _ -> list
          in
          list
        )
        |> List.flatten
    )
    |> List.flatten
    |> Antinodes.of_list
    |> Antinodes.cardinal

    
