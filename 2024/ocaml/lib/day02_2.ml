type direction = Unknown | Incr | Decr

let safe_step a b = abs (b - a) < 4

let rec is_safe_report ?(prev=None) ?(direction=Unknown) ?(can_dampen_problem=true) = function
  | [] -> Some true (* An empty list means safe *)
  | current :: xs -> (
      match (prev, current, direction) with
      (* Prev and current values are same? unsafe *)
      | Some prev, current, _ when prev == current ->
          if can_dampen_problem then
            is_safe_report
              ~can_dampen_problem: false ~prev:(Some prev) ~direction xs
          else
            None

      (* Change in either direction? unsafe *)
      | Some prev, current, Incr when prev > current ->
          if can_dampen_problem then
            is_safe_report ~can_dampen_problem: false ~prev:(Some prev) ~direction xs
          else
            None

      | Some prev, current, Decr when prev < current -> begin
        match can_dampen_problem with
        | true -> is_safe_report ~can_dampen_problem: false ~prev:(Some current) ~direction:Incr xs
        | false -> None
      end

      (* No previous value or direction *)
      | None, current, Unknown -> begin
        (* "Look ahead" and check if first value needs to be dampened? *)
        match safe_step current (List.hd xs) with 
        | true -> is_safe_report ~prev:(Some current) xs ~can_dampen_problem
        | false -> is_safe_report ~prev:None xs ~can_dampen_problem:false
      end

      (* Check if safe to carry on *)
      | Some prev, current, _ ->
          if safe_step prev current then 
            let direction = (if prev > current then Decr else Incr) in 
            is_safe_report ~can_dampen_problem ~prev:(Some current) ~direction xs
          else
            if can_dampen_problem then
              is_safe_report ~can_dampen_problem: false ~prev:(Some prev) ~direction xs
            else
              None

      (* Should never happen? *)
      | None, _, _-> failwith("can not have a direction w/o a prev value")
    )

let run data =
  data
  (* Remove surrounding newlines *)
  |> String.trim
  (* Split each newline into list *)
  |> String.split_on_char '\n'
  |> List.filter_map(fun line -> String.split_on_char ' ' line
      |> List.map(fun string -> int_of_string string)
      |> is_safe_report
  )
  |> List.length



