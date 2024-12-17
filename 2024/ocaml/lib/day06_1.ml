module Position = struct
  type t = int * int
  let compare (x1, y1) (x2, y2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then cmp_x else compare y1 y2
end

module Positions = Set.Make(Position)

let make_grid data =
  data 
    |> String.split_on_char '\n'
    |> List.map(fun row -> row |> String.to_seq)

type position = 
  | Obstacle of (int * int)
  | Start of (int * int)
  | None

type direction = Up | Down | Left | Right

let map_obstacles list =
  list |> List.mapi(fun x row ->
    row |> Seq.mapi(fun y char ->
      match char with
      | '#' -> Obstacle (x, y)
      | '^' -> Start (x, y)
      | _ -> None
    ) |> List.of_seq
  )
  |> List.flatten
  |> List.fold_left(fun (positions, start) position ->
    match position with
    | Obstacle(position) -> (Positions.add position positions, start)
    | Start(position) -> (positions, Some position)
    | None -> (positions, start)
  ) (Positions.empty, None)


let rec move ~position ~direction ~obstacles ~size ~moves = 
  match position with
    | Some (x, y) -> 
      let next_pos =
        match direction with
        | Up -> (x - 1, y)
        | Down -> (x + 1, y)
        | Left -> (x, y - 1)
        | Right -> (x, y + 1)
      in
      (* Check if the next position is out of bounds *)
      if fst next_pos < 0 || snd next_pos < 0 || fst next_pos >= size || snd next_pos >= size then
        moves
      (* If no collision with obstacle *) 
      else if Positions.is_empty (Positions.inter obstacles (Positions.of_list [next_pos])) then
        let new_moves = Positions.add next_pos moves in
        move
          ~position:(Some next_pos)
          ~direction
          ~obstacles
          ~size
          ~moves:new_moves
      (* Colllision with obstacle: set new direction *)
      else
        let new_direction =
          match direction with
          | Up -> Right
          | Right -> Down
          | Down -> Left
          | Left -> Up
        in
        move
          ~position: position
          ~direction: new_direction
          ~obstacles: obstacles
          ~size: size 
          ~moves: moves
  | None -> moves

let run data =
  let grid = data |> String.trim |> make_grid in
  let (obstacles, start_opt) = map_obstacles grid in
  match start_opt with
  | Some start -> 
      move 
        ~position: (Some start)
        ~direction: Up
        ~obstacles: obstacles
        ~size: (grid |> List.length)
        ~moves: Positions.empty
      |> Positions.add start
      |> Positions.elements
      |> List.length
  | None -> failwith "No start position found"


