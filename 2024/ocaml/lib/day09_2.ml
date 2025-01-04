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
      if index mod 2 == 0 then
        Array.init int (fun _ -> index / 2)
      else if int > 0 then
        Array.init int (fun _ -> -1)
      else
        [||]
  ) 
  |> List.filter(fun array -> array |> Array.length > 0)

type block = {
  content: int array;
  mutable size: int
}


let defrag_blocks blocks =

  print_string "\n\nBlocks: ";

  let array = Array.of_list blocks in
  let len = Array.length array in

  let _ = Array.iter(fun array -> 
    array |> Array.iter(fun block -> 
      print_int block
    )
  ) array in

  print_string "\n";

  let rec find_free idx =
    if idx >= len then None
    else if array.(idx).(0) = -1 then Some idx
    else find_free (idx + 1)
  in

  let rec find_used idx size =
    if idx < 0 then None 
    else if array.(idx).(0) <> -1 && size >= (array.(idx) |> Array.length ) then Some idx
    else find_used (idx - 1) size
  in

  let rec defrag_step free_idx =
    match find_free free_idx with
    | None -> ()
    | Some free_pos ->
      match find_used (len - 1) (array.(free_pos) |> Array.length) with
      | None -> ()
      | Some used_pos ->
        if free_pos < used_pos then begin

            Array.iteri (fun i _ -> 
              array.(free_pos).(i) <- array.(used_pos).(0)
            ) array.(used_pos);

            (* Bug: If not all free space is used, we need to create a new free-space block with the remaining size *)

            Array.iteri (fun i _ -> 
              array.(used_pos).(i) <- -1 
            ) array.(used_pos);

          defrag_step (free_pos + 1)
        end
  in
  defrag_step 0;
  print_string "\nAfter sort: ";
  array 
    |> Array.to_list
    |> List.map(fun array -> 
      let _ = Array.iter(fun int -> print_int int) array in
      Array.to_list array
    )
    |> List.flatten

let calculate_checksum blocks =
  print_string "\n";
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
