module Position = struct
  type t = int * int
  let compare (x1, y1) (x2, y2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then cmp_x else compare y1 y2
end

module Positions = Set.Make(Position)

let make_grid data = data 
  |> String.split_on_char '\n'
  |> List.map(fun row -> row |> String.to_seq)

type position = 
  | Obstacle of (int * int)
  | Start of (int * int)
  | None

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

let directions = [| (-1, 0); (0, 1); (1, 0); (0, -1) |]

let move ~position ~direction ~obstacles ~size ~moves =
  match position with
  | Some (x, y) ->
      let rec aux pos dir moves =
        let (dx, dy) = directions.(dir) in
        let next_pos = (fst pos + dx, snd pos + dy) in
        match next_pos with
        (* Out of bounds *)
        | (x, y) when x < 0 || y < 0 || x >= size || y >= size -> moves
        (* Collides with an obstacle: Change direction *)
        | _ when Positions.mem next_pos obstacles -> aux pos ((dir + 1) mod 4) moves
        (* Valid move: Continue moving *)
        | _ -> aux next_pos dir (Positions.add next_pos moves)
      in
      aux (x, y) direction moves
  | None -> moves

let run data =
  let grid = data |> String.trim |> make_grid in
  let (obstacles, start_opt) = map_obstacles grid in
  match start_opt with
  | Some start -> 
      move 
        ~position: (Some start)
        ~direction: 0
        ~obstacles: obstacles
        ~size: (grid |> List.length)
        ~moves: (Positions.singleton start)
      |> Positions.elements
      |> List.length
  | None -> failwith "No start position found"

