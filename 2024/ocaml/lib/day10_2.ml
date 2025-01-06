type node = {
  x : int;
  y : int;      
  height : int;  
}

type tree =
  | Node of node * tree list

let rec print_tree (Node (n, children)) indent =
  Printf.printf "%sNode: (x: %d, y: %d, value: %d)\n"
    (String.make indent ' ') n.x n.y n.height;
  List.iter (fun child -> print_tree child (indent + 2)) children

let possible_moves x y = 
  [ (x + 1, y); (x - 1, y); (x, y + 1); (x, y - 1) ]

let is_valid_position (x, y) height grid =
  let (x_min, x_max, y_min, y_max) = (0, Array.length grid - 1, 0, Array.length grid.(0) - 1) in
  x >= x_min && x <= x_max && y >= y_min && y <= y_max && grid.(x).(y) = (height + 1)

let traverse_tree node grid =
  let counter = ref 0 in
  let rec aux node grid = 
    let moves =
      List.filter (fun pos -> is_valid_position pos node.height grid) (possible_moves node.x node.y)
    in
    let children = List.map(fun (x,y) -> 
      aux {x=x; y=y; height=node.height + 1} grid
    ) moves in
    if List.length children == 0 && node.height = 9 then
      counter := counter.contents + 1;
    Node(node, children) in
  let _ = aux node grid in
  counter.contents

let string_to_char_list s =
  List.init (String.length s) (String.get s)

let make_grid input = input
  |> String.trim 
  |> String.split_on_char '\n'
  |> List.map(fun row -> 
    row 
    |> string_to_char_list 
    |> List.map(fun char -> 
      String.make 1 char 
      |> int_of_string
    )
    |> Array.of_list
  )
  |> Array.of_list

let get_trailheads grid =
  grid |> Array.mapi(fun x row -> 
    let test = row 
      |> Array.fold_left(fun (acc, y) height -> 
        if height = 0 then begin
          (acc @ [{ x=x; y=y; height=height; }], y + 1)
        end else
          (acc, y + 1)
      ) ([], 0)  in
    fst test
  ) 
  |> Array.to_list 
  |> List.flatten

let run input = 
  let grid = make_grid input in
  get_trailheads grid
  |> List.fold_left(fun acc node -> 
      let result = traverse_tree node grid in
      acc + result
  ) 0
