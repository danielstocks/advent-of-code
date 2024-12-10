let extract_expressions = Re.(compile (seq [str "mul("; rep1 digit; str ","; rep1 digit; str ")"]))
let extract_numbers = Re.(compile (seq [str "("; group (rep1 digit); str ","; group (rep1 digit); str ")"]))

let extract_matches matches =
  List.map
    (fun substrings ->
       try Re.Group.get substrings 0
       with Invalid_argument _ -> "Invalid match")
    matches


let run data =
  let matches = Re.all extract_expressions data in
  extract_matches matches
  |> List.map(
       fun text -> 
         let x = match Re.exec_opt extract_numbers text with 
          | Some groups ->
              let first_number = Re.Group.get groups 1 in
              let second_number = Re.Group.get groups 2 in
              (int_of_string first_number, int_of_string second_number)
          | None -> failwith "no numbers found in expression" 
         in begin
           fst(x) * snd(x)
         end
     )
  |> List.fold_left (+) 0 

