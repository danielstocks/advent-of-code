let scan x y array size =
  match (x,y) with
    | (x,y) when x > 0 && x < (size - 1) && y > 0 && y < (size - 1) -> 
        let nw = String.get array.(x - 1 ) (y - 1) in
        let ne = String.get array.(x - 1 ) (y + 1) in
        let sw = String.get array.(x + 1) (y - 1) in
        let se = String.get array.(x + 1) (y + 1) in
        let cond1 = nw = 'M' && se = 'S' || nw = 'S' && se = 'M' in
        let cond2 = ne = 'M' && sw = 'S' || ne = 'S' && sw = 'M' in
        cond1 && cond2
    | (_,_) -> false


let run data =
  let input = data |> String.trim |> String.split_on_char '\n' in
  let size = List.length input in
  let array = input |> Array.of_list in
  let count = ref 0 in
  for x = 0 to (size - 1) do 
    for y = 0 to (size - 1) do 
      let char = String.get array.(x) y in
      match char with
      | 'A' -> 
        if scan x y array size then count := !count + 1;
      | _ -> ()
    done;
  done;
  !count


