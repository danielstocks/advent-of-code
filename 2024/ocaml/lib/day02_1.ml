let input = File.read "../input/day02.txt"

let test_input = "
7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9
"
type direction = Unknown | Incr | Decr

let safe_step a b = abs (b - a) < 4

let rec is_safe_report ?(prev=None) ?(direction=Unknown) list =
  match list with
  | [] ->
    (* An empty list means safe *)
    true 
  | current :: xs -> (
      match (prev, current, direction) with

      (* Prev and current values are same? unsafe *)
      | Some prev, current, _ when prev == current -> false

      (* Change in either direction? unsafe *)
      | Some prev, current, Incr when prev > current -> false
      | Some prev, current, Decr when prev < current -> false

      (* No previous value or direction, just carry on *)
      | None, current, Unknown -> is_safe_report ~prev:(Some current) xs

      (* Check if safe to carry on *)
      | Some prev, current, _ ->
          if safe_step prev current then 
            is_safe_report ~prev:(Some current) ~direction: (if prev > current then Decr else Incr) xs
          else false

      (* Should never happen? *)
      | None, _, _-> failwith("can not have a direction w/o a prev value")
    )

let run data =
  data
  (* Remove surrounding newlines *)
  |> String.trim
  (* Split each newline into list *)
  |> String.split_on_char '\n'
  |> List.map(
    (* Split each line to list of ints *)
    fun line -> String.split_on_char ' ' line
      |> List.map(fun s -> int_of_string s)
      |> is_safe_report
  )
  |> List.filter(fun x -> x) 
  |> List.length
