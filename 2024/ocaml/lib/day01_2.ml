let input = File.read "../input/day01.txt"

let test_input = "
3   4
4   3
2   5
1   3
3   9
3   3
"

let get_similarity_score(list1, list2) = 
  List.fold_left (fun sum item -> 
    sum + item * (list2
      |> List.filter(fun n -> n = item)
      |> List.length)
  ) 0 list1

let run data =
  data
  (* Remove surrounding newlines *)
  |> String.trim
  (* Split each newline into list *)
  |> String.split_on_char '\n'
  (* Map through each line and create pairs. Eg. [(1,2),(3,4)] *)
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
  |> get_similarity_score
