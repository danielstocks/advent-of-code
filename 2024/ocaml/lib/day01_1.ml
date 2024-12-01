let input = File.read "../input/day01.txt"

let test_input = "
3   4
4   3
2   5
1   3
3   9
3   3
"

let pair_sort (list1, list2) =
  (List.sort compare list1, List.sort compare list2)

let pair_to_list (list1, list2) =
  List.combine list1 list2

let run data = data
  (* Remove surrounding newlines *)
  |> String.trim
  (* Split each newline into list *)
  |> String.split_on_char '\n'
  (* Map through each line and create pairs. Eg. [[1,2],[3,4]] *)
  |> List.map (
    fun line -> let list = String.split_on_char ' ' line
      |> List.filter (fun s -> s <> "")
      |> List.map(fun s -> int_of_string s) in
      match list with 
        | [x; y] -> (x,y)
        | _ -> failwith "input error"
  )
  (* Split, sort, and turn back to a list *)
  |> List.split
  |> pair_sort
  |> pair_to_list
  (* Calculate distance between each pair *)
  |> List.map(fun pair -> abs(snd(pair) - fst(pair)))
  (* Sum distance *)
  |> List.fold_left (+) 0 
