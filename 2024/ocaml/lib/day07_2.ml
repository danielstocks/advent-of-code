let rec generate_combinations n =
  if n = 0 then
    [[]]
  else
    let rest = generate_combinations (n - 1) in
    List.concat [
      List.map (fun ops -> "+" :: ops) rest;
      List.map (fun ops -> "*" :: ops) rest;
      List.map (fun ops -> "|" :: ops) rest
    ]

let find_expressions list = 
  list |> List.filter_map(fun (sum, numbers) -> 
    (* Cache this? *)
    let found_expression = generate_combinations ((List.length numbers) - 1)
    |> List.exists(fun operators ->
      sum = List.fold_left2(fun acc operator number ->
        match operator with 
        | "*" -> acc * number
        | "+" -> acc + number
        | "|" -> int_of_string((string_of_int acc) ^ (string_of_int number))
        | _ -> failwith "invalid operator"
      ) (List.hd numbers) operators (List.tl numbers)
    ) in
    if found_expression then
      Some sum
    else
      None
  )

let run data = data 
  |> String.trim
  |> String.split_on_char '\n'
  |> List.map(fun line -> (
    match (line |> String.split_on_char ':') with
    | [sum; numbers] -> (
      int_of_string sum,
      numbers
        |> String.trim
        |> String.split_on_char ' '
        |> List.map(fun string -> (
          int_of_string string
        ))
    )
    | _ -> failwith "could not parse sum and numbers"
  ))
  |> find_expressions
  |> List.fold_left (+) 0
