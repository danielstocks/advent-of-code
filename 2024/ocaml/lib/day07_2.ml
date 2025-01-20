let concat_numbers a b =
  let rec pow10 n =
    if n = 0 then 1
    else 10 * pow10 (n-1)
  in
  let rec count_digits n =
    if n = 0 then 0
    else 1 + count_digits (n / 10)
  in
  let digits = count_digits b in
  a * pow10 digits + b

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
  let cache = Hashtbl.create 2400 in
  let aux list cache = 
    list |> List.filter_map(fun (sum, numbers) -> 
      let key = List.length numbers in
      let expressions = match Hashtbl.find_opt cache key with
      | Some expressions -> expressions
      | None -> 
          let result = generate_combinations ((List.length numbers) - 1) in
          Hashtbl.add cache key result;
          result 
      in
      match expressions |> List.exists(fun operators ->
        sum = List.fold_left2(fun acc operator number ->
          match operator with 
          | "*" -> acc * number
          | "+" -> acc + number
          | "|" -> concat_numbers acc number
          | _ -> failwith "invalid operator"
        ) (List.hd numbers) operators (List.tl numbers)
      ) with
      | true -> Some sum
      | false -> None
    ) in
  aux list cache

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
        |> List.map(fun string -> int_of_string string)
    )
    | _ -> failwith "could not parse sum and numbers"
  ))
  |> find_expressions
  |> List.fold_left (+) 0
