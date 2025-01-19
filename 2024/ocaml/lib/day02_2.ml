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

      | Some prev, current, Decr when prev < current ->
          if can_dampen_problem then
            is_safe_report ~can_dampen_problem: false ~prev:(Some current) ~direction:Incr xs
          else
            None

      (* No previous value or direction, just carry on *)
      | None, current, Unknown -> 
          (* Check if we need to dampen first step by looking ahead *)
          let next = List.hd xs in
          if safe_step current next then 
            is_safe_report ~prev:(Some current) xs ~can_dampen_problem
          else
            is_safe_report ~prev:None xs ~can_dampen_problem:false

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



