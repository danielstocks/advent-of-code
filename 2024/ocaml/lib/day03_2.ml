let extract_expressions =
  Re.(compile
    (alt [
      seq [str "mul("; rep1 digit; str ","; rep1 digit; str ")"];
      seq [str "don't()"];
      seq [str "do()"];
    ]))

let extract_numbers = Re.(compile 
  (seq [str "("; group (rep1 digit); str ","; group (rep1 digit); str ")"])
)

let extract_matches matches =
  List.map
    (fun substrings ->
       try Re.Group.get substrings 0
       with Invalid_argument _ -> "Invalid match")
    matches

let rec extract ?(pass=true) ?(new_list=[]) list = 
  match list with 
  | [] -> new_list
  | current :: xs ->
      match current with
      | string when string = "do()" -> extract ~pass:true ~new_list:new_list xs
      | string when string = "don't()" -> extract ~pass:false ~new_list:new_list xs
      | string -> 
          if pass then 
            extract ~pass:pass ~new_list:(string :: new_list) xs
          else
            extract ~pass ~new_list:new_list xs

let run data =
  let matches = Re.all extract_expressions data in
  extract_matches matches
    |> extract
    |> List.map(
         fun text -> 
           match Re.exec_opt extract_numbers text with 
            | Some groups ->
                let first_number = Re.Group.get groups 1 in
                let second_number = Re.Group.get groups 2 in
                int_of_string first_number * int_of_string second_number
            | None -> 0
       )
    |> List.fold_left (+) 0 

