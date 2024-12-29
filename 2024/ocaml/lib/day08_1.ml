module Antinode = struct
  type t = int * int
  let compare (x1, y1) (x2, y2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then cmp_x else compare y1 y2
end
module Antinodes = Set.Make(Antinode)

type direction = Left | Right

let rec move_steps (x, y) dir size steps =
  if steps = 0 then
    (x, y)
  else
    let next_x, next_y =
      match dir with
      | Right ->
        if y < size then
          (x, y + 1)
        else
          (x + 1, 0)
      | Left ->
        if y = 0 then
          (x - 1, size)
        else
          (x, y - 1)
    in
    move_steps (next_x, next_y) dir size (steps - 1)

let rec count_steps (x, y) (goal_x, goal_y) dir size steps =
  if x = goal_x && y = goal_y then
    steps
  else
    let next_x, next_y =
      match dir with
      | Right ->
        if y < size then
          (x, y + 1)
        else
          (x + 1, 0)
      | Left ->
        if y < 0 then
          (x - 1, size - 1)
        else
          (x, y - 1)
    in
    count_steps (next_x, next_y) (goal_x, goal_y) dir size (steps + 1)

let steps_to_reach start goal dir size =
  count_steps start goal dir size 0

let string_to_char_list s =
  List.init (String.length s) (String.get s)

let get_direction o_x o_y x y =
  if o_x < x || (o_x = x && o_y < y) then
    Left
  else
    Right 

let antinodes = Antinodes.empty

let within_bounds x y size =
  x > -1 && y > -1 && y < size && x < size

let run data = 
  let grid_lines = data |> String.trim |> String.split_on_char '\n' in
  let size = grid_lines |> List.length in
  let antennas = grid_lines 
    |> List.mapi(fun x line -> 
        line |> string_to_char_list |> List.mapi(fun y char ->
          if char = '.' then
            None
          else
            Some (x, y, char)
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
          char = o_char && o_x <> x && o_y <> y
        ))
        |> List.map(fun opposite ->
          let (o_x, o_y, _) = opposite in
          let steps = ((steps_to_reach (x, y) (o_x, o_y) (get_direction o_x o_y x y) size)) in
          let list = match (move_steps (x, y) (get_direction x y o_x o_y) size steps) with
            | (x, y) when within_bounds x y size ->
                [(x, y)]
            | _ -> [] 
          in
          let list = match (move_steps (o_x, o_y) (get_direction o_x o_y x y) size steps) with
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
    
