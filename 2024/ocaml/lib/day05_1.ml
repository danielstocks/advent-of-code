module StringSet = Set.Make(String)

let intersects list1 list2 =
  StringSet.inter (StringSet.of_list list1) (StringSet.of_list list2)
  |> StringSet.elements
  |> List.length > 0

let split_on_double_newline s =
  Str.split (Str.regexp "\n\n") s

let add_to_hashtable table key value =
  match Hashtbl.find_opt table key with
  | Some existing_list -> Hashtbl.replace table key (value :: existing_list)
  | None -> Hashtbl.add table key [value]

let rules_to_hash_table rules =
  let rules_table = Hashtbl.create 1 in
  rules 
    |> String.trim 
    |> String.split_on_char '\n'
    |> List.iter(fun string -> 
      match String.split_on_char '|' string with
      | [key; value] -> add_to_hashtable rules_table key value
      | _ -> failwith "invalid input - more than two values"
    );
    rules_table

let rec is_valid_order list rules = 
  match list with
    | [] -> true
    | current :: xs ->
    match Hashtbl.find_opt rules current with
    | Some values when intersects xs values -> false
    | _ -> is_valid_order xs rules

let middle list =
  let len = List.length list in
  let mid = len / 2 in
  List.nth list mid

let run data = 
  match split_on_double_newline (data |> String.trim) with 
    | [rules; updates] -> 
      updates
        |> String.split_on_char '\n'
        |> List.fold_left (fun acc rule ->
            let numbers = rule |> String.split_on_char ',' in
            if is_valid_order
              (numbers |> List.rev)
              (rules |> rules_to_hash_table)
            then
              acc + (numbers |> middle |> int_of_string)
            else
              acc
         ) 0
    | _ -> failwith "Invalid input - could not split rules & numbers" 
