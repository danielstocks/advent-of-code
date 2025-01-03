let string_to_char_list s =
  List.init (String.length s) (String.get s)

let convert_to_blocks string = string 
  |> string_to_char_list 
  |> List.mapi(fun i char ->
      let len = char |> String.make 1 |> int_of_string in
      if i mod 2 == 0 then
        List.init len (fun _ -> string_of_int (i / 2))
      else
        List.init len (fun _ -> ".")
  )
  |> List.flatten
  |> String.concat ""

let run data =
  let x = data |> String.trim |> convert_to_blocks in
  x |> String.length
