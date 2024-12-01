let input = File.read "../input/day00.txt"

let run _ = 
        print_endline "\n";
        input
        |> String.trim
        |> String.split_on_char '\n'
        |> List.map (fun x -> print_endline x; x)
        |> List.length
