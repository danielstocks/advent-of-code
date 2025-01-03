let string_to_int_list string =
  List.init (String.length string) (fun index ->  
    let char = String.get string index in
    if char == '.' then 
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
      if index mod 2 == 0 then
        List.init int (fun _ -> index / 2)
      else
        List.init int (fun _ -> -1)
  )
  |> List.flatten

let defrag_blocks blocks =
  let free_space = blocks |> List.fold_left (fun (acc, index) block ->
    if block == -1 then
      (acc @ [index], index + 1)
    else
      (acc, index + 1)
  ) ([], 0)
  |> fst in

  let array = blocks |> Array.of_list in
  let _ = blocks 
    |> List.rev 
    |> List.fold_left(fun (free, block_index) block -> 
      let (index, rest) = pop free in
      if block != -1 && block_index > index then begin
        array.(index) <- block;
        array.(block_index) <- -1;
        (rest, block_index - 1)
      end else
        (free, block_index - 1)
    ) (free_space, (List.length blocks) - 1) in
  array |> Array.to_list

let calculate_checksum blocks =
  blocks 
    |> List.filter(fun block -> block > -1)
    |> List.fold_left(fun (acc, index) block ->
        (acc + block * index, index +1)
    ) (0, 0) 
    |> fst

let run data = data
    |> String.trim 
    |> string_to_int_list
    |> diskmap_to_blocks
    |> defrag_blocks
    |> calculate_checksum
