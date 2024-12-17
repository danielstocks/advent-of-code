let reset = "\027[0m" (* reset to default color *)
let green = "\027[32m" (* ansi escape code for green *)
let red = "\027[31m" (* ansi escape code for red *)
let run ~fn ~day ~part ~mode ~input ~result =
  let (output, time) = Ocaml.Benchmark.time_function fn input in
  Printf.printf "\nDay %s, part %s, %s result: %d | Benchmark: %.2fms" day part mode output time;
  match output == result with
    | true -> 
        Printf.printf "%s OK %s" green reset
    | false -> 
        Printf.printf "%s FAIL: got %d but expected %d %s" red output result reset

(* 
   --- DAY ONE ---
*)
let day01_input = Ocaml.File.read "../input/day01.txt"
let day01_test_input = Ocaml.File.read "../input/day01_test.txt"
let () = run ~day:"01" ~part:"1" ~mode:"test" ~input:day01_test_input ~fn:Ocaml.Day01_1.run ~result:11 
let () = run ~day:"01" ~part:"1" ~mode:"actual" ~input:day01_input ~fn:Ocaml.Day01_1.run ~result:2166959
let () = run ~day:"01" ~part:"2" ~mode:"test" ~input:day01_test_input ~fn:Ocaml.Day01_2.run ~result:31
let () = run ~day:"01" ~part:"2" ~mode:"actual" ~input:day01_input ~fn:Ocaml.Day01_2.run ~result:23741109
let () = print_endline ""

(* 
   --- DAY TWO ---
*)
let day02_input = Ocaml.File.read "../input/day02.txt"
let day02_test_input = Ocaml.File.read "../input/day02_test.txt"
let () = run ~day:"02" ~part:"1" ~mode:"test" ~input:day02_test_input ~fn:Ocaml.Day02_1.run ~result:2
let () = run ~day:"02" ~part:"1" ~mode:"actual" ~input:day02_input ~fn:Ocaml.Day02_1.run ~result:402
let () = run ~day:"02" ~part:"2" ~mode:"test" ~input:day02_test_input ~fn:Ocaml.Day02_2.run ~result:4
let () = run ~day:"02" ~part:"2" ~mode:"actual" ~input:day02_input ~fn:Ocaml.Day02_2.run ~result:455
let () = print_endline ""

(* 
   --- DAY THREE ---
*)
let day03_input = Ocaml.File.read "../input/day03.txt"
let day03_test_input = Ocaml.File.read "../input/day03_test.txt"
let day03_test_input_2 = Ocaml.File.read "../input/day03_test_2.txt"
let () = run ~day:"03" ~part:"1" ~mode:"test" ~input:day03_test_input ~fn:Ocaml.Day03_1.run ~result:161
let () = run ~day:"03" ~part:"1" ~mode:"actual" ~input:day03_input ~fn:Ocaml.Day03_1.run ~result:160672468
let () = run ~day:"03" ~part:"2" ~mode:"test" ~input:day03_test_input_2 ~fn:Ocaml.Day03_2.run ~result:48
let () = run ~day:"03" ~part:"2" ~mode:"actual" ~input:day03_input ~fn:Ocaml.Day03_2.run ~result:84893551
let () = print_endline ""

(* 
  --- DAY FOUR ---
*)
let day04_input = Ocaml.File.read "../input/day04.txt"
let day04_test_input = Ocaml.File.read "../input/day04_test.txt"
let day04_test_input_2 = Ocaml.File.read "../input/day04_test_2.txt"
let () = run ~day:"04" ~part:"1" ~mode:"test" ~input:day04_test_input ~fn:Ocaml.Day04_1.run ~result:18
let () = run ~day:"04" ~part:"1" ~mode:"actual" ~input:day04_input ~fn:Ocaml.Day04_1.run ~result:2549
let () = run ~day:"04" ~part:"2" ~mode:"test" ~input:day04_test_input_2 ~fn:Ocaml.Day04_2.run ~result:9
let () = run ~day:"04" ~part:"2" ~mode:"actual" ~input:day04_input ~fn:Ocaml.Day04_2.run ~result:2003
let () = print_endline ""

(* 
  --- DAY FIVE ---
*)
let day05_test_input = Ocaml.File.read "../input/day05_test.txt"
let day05_input = Ocaml.File.read "../input/day05.txt"
let () = run ~day:"05" ~part:"1" ~mode:"test" ~input:day05_test_input ~fn:Ocaml.Day05_1.run ~result:143
let () = run ~day:"05" ~part:"1" ~mode:"actual" ~input:day05_input ~fn:Ocaml.Day05_1.run ~result:5639
let () = run ~day:"05" ~part:"2" ~mode:"test" ~input:day05_test_input ~fn:Ocaml.Day05_2.run ~result:123
let () = run ~day:"05" ~part:"2" ~mode:"actual" ~input:day05_input ~fn:Ocaml.Day05_2.run ~result:5273
let () = print_endline ""

(* 
  --- DAY SIX ---
*)
let day06_test_input = Ocaml.File.read "../input/day06_test.txt"
let day06_input = Ocaml.File.read "../input/day06.txt"
let () = run ~day:"06" ~part:"1" ~mode:"test" ~input:day06_test_input ~fn:Ocaml.Day06_1.run ~result:41
let () = run ~day:"06" ~part:"1" ~mode:"actual" ~input:day06_input ~fn:Ocaml.Day06_1.run ~result:5461
let () = print_endline ""
