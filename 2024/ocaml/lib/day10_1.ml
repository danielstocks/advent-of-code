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
  let leafs = ref 0 in
  let rec aux node grid = 
    let moves =
      List.filter (fun pos -> is_valid_position pos node.height grid) (possible_moves node.x node.y)
    in
    let children = List.map(fun (x,y) -> 
      aux {x=x; y=y; height=node.height + 1} grid
    ) moves in
    if List.length children == 0 then
      leafs := leafs.contents + 1;
    Node(node, children) in
  let _ = aux node grid in
  leafs.contents

let string_to_char_list s =
  List.init (String.length s) (String.get s)

let run data = 
  let grid = data 
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
  in
  traverse_tree 
    {x=5; y=6; height=0;} 
    grid

(*
let tree = traverse_tree
  {x=5; y=6; height=0;} 
  [|
  [|1; 0; 5; 1; 9; 1; 1|];
  [|2; 5; 5; 1; 8; 1; 1|];
  [|3; 1; 1; 1; 7; 1; 1|];
  [|4; 5; 6; 7; 6; 5; 4|];
  [|1; 1; 1; 8; 1; 1; 3|];
  [|1; 1; 1; 9; 5; 5; 2|];
  [|1; 1; 1; 1; 5; 0; 1|];
|]

let tree2 = traverse_tree
  {x=0; y=1; height=0;} 
  [|
  [|1; 0; 5; 1; 9; 1; 1|];
  [|2; 5; 5; 1; 8; 1; 1|];
  [|3; 1; 1; 1; 7; 1; 1|];
  [|4; 5; 6; 7; 6; 5; 4|];
  [|1; 1; 1; 8; 1; 1; 3|];
  [|1; 1; 1; 9; 5; 5; 2|];
  [|1; 1; 1; 1; 5; 0; 1|];
|]
let () = print_string "\n"
let () = print_int tree
let () = print_int tree2
let () = print_tree tree 0
let () = print_tree tree2 0
*)

