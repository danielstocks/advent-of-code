let string_to_int_list string =
  List.init (String.length string) (fun index ->  
    let char = String.get string index in
    if char = '.' then 
      -1 
    else 
      int_of_string (String.make 1 (char))
  )

let pop = function
  | [] -> failwith "Can't pop empty list"
  | x :: xs -> (x, xs)

let diskmap_to_blocks list = list 
  |> List.mapi(fun index int ->
      if index mod 2 == 0 then
        Array.init int (fun _ -> index / 2)
      else if int > 0 then
        Array.init int (fun _ -> -1)
      else
        [||]
  ) 
  |> List.filter(fun array -> array |> Array.length > 0)

let insert_after_index arr index item =
  let n = Array.length arr in
  if index < -1 || index >= n then
    invalid_arg "Index out of bounds";
  let new_arr = Array.make (n + 1) item in
  Array.blit arr 0 new_arr 0 (index + 1);
  Array.blit arr (index + 1) new_arr (index + 2) (n - (index + 1));
  new_arr

let defrag_blocks blocks =
  let initial = Array.of_list blocks in
  let rec find_free idx array =
    let len = Array.length array in
    if idx >= len then None
    else if array.(idx).(0) = -1 then Some idx
    else find_free (idx + 1) array
  in
  let rec find_used idx size array =
    if idx < 0 then None 
    else if array.(idx).(0) <> -1 && size >= (array.(idx) |> Array.length ) then Some idx
    else find_used (idx - 1) size array
  in
  let rec defrag_step free_idx array =
    let len = Array.length array in
    match find_free free_idx array with
    | None -> array
    | Some free_pos ->
      match find_used (len - 1) (array.(free_pos) |> Array.length) array with
      | None -> array
      | Some used_pos ->
        if free_pos < used_pos then begin
            let diff = (Array.length array.(free_pos)) - (Array.length array.(used_pos)) in
            array.(free_pos) <- Array.make (Array.length array.(used_pos)) array.(used_pos).(0);
            Array.iteri (fun i _ -> 
              array.(used_pos).(i) <- -1 
            ) array.(used_pos);
            if diff > 0 then begin
              defrag_step (free_pos + 1) (insert_after_index array free_pos (Array.make diff (-1)))
            end
            else
              defrag_step (free_pos + 1) array
        end else
          defrag_step (free_pos + 1) array
  in
  let output = defrag_step 0 initial in
  output 
    |> Array.to_list
    |> List.map(fun array -> 
      Array.to_list array
    )
    |> List.flatten

let calculate_checksum blocks =
  blocks 
    |> List.fold_left(fun (acc, index) block ->
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
