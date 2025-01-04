let string_to_int_list string =
  List.init (String.length string) (fun index ->  
    let char = String.get string index in
    if char = '.' then 
      -1 
    else 
      int_of_string (String.make 1 (char))
  )

let pop list =
  match list with
  | [] -> failwith "Can't pop empty list"
  | x :: xs -> (x, xs)

let diskmap_to_blocks list = list 
  |> List.mapi(fun index int ->
      if index mod 2 = 0 then
        List.init int (fun _ -> index / 2)
      else
        List.init int (fun _ -> -1)
  )
  |> List.flatten

let defrag_blocks blocks =
  let array = Array.of_list blocks in
  let len = Array.length array in
  let rec find_free idx =
    if idx >= len then None
    else if array.(idx) = -1 then Some idx
    else find_free (idx + 1)
  in
  let rec find_used idx =
    if idx < 0 then None 
    else if array.(idx) <> -1 then Some idx
    else find_used (idx - 1)
  in
  let rec defrag_step free_idx =
    match find_free free_idx with
    | None -> ()
    | Some free_pos ->
      match find_used (len - 1) with
      | None -> ()
      | Some used_pos ->
        if free_pos < used_pos then begin
          array.(free_pos) <- array.(used_pos);
          array.(used_pos) <- -1;
          defrag_step (free_pos + 1)
        end
  in
  defrag_step 0;
  array

let calculate_checksum blocks =
  blocks 
    |> Array.fold_left(fun (acc, index) block ->
      if block > -1 then
        (acc + block * index, index +1)
      else
        (acc, index+1)
    ) (0, 0) 
    |> fst

let run data = data
    |> String.trim 
    |> string_to_int_list
    |> diskmap_to_blocks
    |> defrag_blocks
    |> calculate_checksum
