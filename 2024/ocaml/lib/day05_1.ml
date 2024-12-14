module StringSet = Set.Make(String)

let intersects list1 list2 =
  StringSet.inter (StringSet.of_list list1) (StringSet.of_list list2)
  |> StringSet.elements
  |> List.length > 0

let split_on_double_newline s =
  Str.split (Str.regexp "\n\n") s

let add_to_hashtable table key value =
  if Hashtbl.mem table key then
    let existing_list = Hashtbl.find table key in
    Hashtbl.replace table key (value :: existing_list)
  else
    Hashtbl.add table key [value]

let rules_to_hash_table rules =
  let rulesTable = Hashtbl.create 1 in
  rules 
    |> String.trim 
    |> String.split_on_char '\n'
    |> List.iter(fun string -> 
        let (key, value) = match String.split_on_char '|' string with
          | [a; b] -> (a, b)
          | _ -> failwith "Invalid input"
        in
        add_to_hashtable rulesTable key value
    );
    rulesTable

let rec is_valid_order list rules = 
  match list with
    | [] -> true
    | current :: xs ->
        if Hashtbl.mem rules current then
          let hello = Hashtbl.find rules current in
          if intersects xs hello then begin
            false
          end
          else
            is_valid_order xs rules
        else
            is_valid_order xs rules

let middle lst =
  let len = List.length lst in
  if len mod 2 != 0 then
    let mid = len / 2 in
    List.nth lst mid
  else
    failwith "list is even, cant get middle"

let run data = 
  let input = data |> String.trim in
  let (rawRules, rawNumbers) = match split_on_double_newline input with 
    | [a; b] -> (a, b |> String.split_on_char '\n')
    | _ -> failwith "Invalid input numbers & rules" 
  in
  let rules = rules_to_hash_table rawRules in
  let validNumbers = rawNumbers |> List.filter(fun numbers -> 
    is_valid_order (numbers |> String.split_on_char ',' |> List.rev) rules
  ) in
  validNumbers
    |> List.map(fun string -> string |> String.split_on_char ',' |> middle |> int_of_string)
    |> List.fold_left (+) 0
