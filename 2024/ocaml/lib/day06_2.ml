type direction = Up | Down | Left | Right

module Move = struct
  type t = int * int * direction
  let compare (x1, y1, dir1) (x2, y2, dir2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then 
      cmp_x
    else
      let cmp_y = compare y1 y2 in
      if cmp_y <> 0 then cmp_y else compare dir1 dir2
end
module Moves = Set.Make(Move)

module Obstacle = struct
  type t = int * int
  let compare (x1, y1) (x2, y2) =
    let cmp_x = compare x1 x2 in
    if cmp_x <> 0 then cmp_x else compare y1 y2
end

module Obstacles = Set.Make(Obstacle)

let make_grid data =
  data 
    |> String.split_on_char '\n'
    |> List.map(fun row -> row |> String.to_seq)

type char = 
  | Obstacle of (int * int)
  | Start of (int * int * direction)
  | None

let map_obstacles list =
  list |> List.mapi(fun x row ->
    row |> Seq.mapi(fun y char ->
      match char with
      | '#' -> Obstacle(x, y)
      | '^' -> Start (x, y, Up)
      | _ -> None
    ) |> List.of_seq
  )
  |> List.flatten
  |> List.fold_left(fun (obstacles, start) obstacle ->
    match obstacle with
    | Obstacle(x, y) -> (Obstacles.add (x, y) obstacles, start)
    | Start((x, y, direction)) -> (obstacles, Some (x, y, direction))
    | None -> (obstacles, start)
  ) (Obstacles.empty, None)

let next x y direction = 
  match direction with
    | Up -> (x - 1, y)
    | Down -> (x + 1, y)
    | Left -> (x, y - 1)
    | Right -> (x, y + 1)

let get_new_direction direction = 
  match direction with
  | Up -> Right
  | Right -> Down
  | Down -> Left
  | Left -> Up

let rec get_moves ~move ~obstacles ~size ~moves = 
  match move with
    | Some (x, y, direction) -> 
      let (new_x, new_y) = next x y direction in
      (* Check if out of bounds *)
      if new_x < 0 || new_y < 0 || new_x >= size || new_y >= size then
        moves
      (* Colllision with obstacle: set new direction *)
      else if Obstacles.mem (new_x, new_y) obstacles then
        let new_direction = get_new_direction direction in
        let new_moves = Moves.add (x, y, new_direction) moves in
        let new_moves = Moves.remove (x, y, direction) new_moves in
        get_moves
          ~move: (Some (x, y, new_direction))
          ~obstacles: obstacles
          ~size: size 
          ~moves: new_moves
      (* If no collision with obstacle keep going *) 
      else
        let new_moves = Moves.add (new_x, new_y, direction) moves in
        get_moves
          ~move:(Some (new_x, new_y, direction))
          ~obstacles
          ~size
          ~moves:new_moves
    | None -> moves

let is_infinite_loop ~move ~obstacles ~size ~visited =
  let rec aux (x, y, direction) =
    let (next_x, next_y) = next x y direction in
    (* Check if out of bounds *)
    if next_x < 0 || next_y < 0 || next_x >= size || next_y >= size then
      false
    (* Detect if we've revisited the same position and direction *)
    else if Hashtbl.mem visited (next_x, next_y, direction) then
      true
    (* Check for obstacle collision *)
    else if Obstacles.mem (next_x, next_y) obstacles then begin
      (* Change direction and recurse *)
      let new_direction = get_new_direction direction in
      aux (x, y, new_direction)
    end
    (* Continue moving if no collision *)
    else begin
      (* Mark the current state as visited *)
      Hashtbl.add visited (next_x, next_y, direction) true;
      aux (next_x, next_y, direction)
    end
  in
  match move with
  | Some (x, y, direction) -> aux (x, y, direction)
  | None -> failwith "No move provided"


let seen = Hashtbl.create 16000

let run data =
  let grid = data |> String.trim |> make_grid in
  let (obstacles, start_opt) = map_obstacles grid in
  match start_opt with
  | Some start ->
      get_moves
        ~move: (Some start)
        ~obstacles: obstacles
        ~size: (grid |> List.length)
        ~moves: (Moves.empty)
      |> Moves.elements
      |> List.fold_left(fun infinites move -> 
        let (new_x, new_y) = match move with
          | (x, y, Up) -> (x - 1, y)
          | (x, y, Down) -> (x + 1, y)
          | (x, y, Right) -> (x, y + 1)
          | (x, y, Left) -> (x, y - 1)
        in
        if Hashtbl.mem seen (new_x, new_y) then
          infinites
        else begin
          Hashtbl.add seen (new_x, new_y) true;
          let new_obstacles = Obstacles.add (new_x, new_y) obstacles in
          if is_infinite_loop
            ~move: (Some start)
            ~obstacles: new_obstacles
            ~size: (grid |> List.length)
            ~visited:(Hashtbl.create 36000)
          then
            Obstacles.add (new_x, new_y) infinites
          else
            infinites
        end

      ) Obstacles.empty
      |> Obstacles.elements
      |> List.length
  | None -> failwith "No start position found"
