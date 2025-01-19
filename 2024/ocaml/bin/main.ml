let reset = "\027[0m" (* reset to default color *)
let green = "\027[32m" (* ansi escape code for green *)
let red = "\027[31m" (* ansi escape code for red *)

let exec fn day part mode input result = 
  let (output, time) = Ocaml.Benchmark.time_function fn input in
  let ftime = Printf.sprintf "%.2fms" time in
  Printf.printf "\nDay %s, part %s, input: %s | Benchmark: %-9s" day part mode ftime;
  match output == result with
    | true -> 
        Printf.printf "%s OK %s" green reset;
        flush stdout
    | false -> 
        Printf.printf "%s \n-- FAIL: got %d, expected %d --%s \n" red output result reset;
        flush stdout

let run ~fn ~day ~part ~mode ~input ~result =
  let args = Array.to_list Sys.argv in
  let mode_filter = (List.nth_opt args 1) in
  let day_filter = (List.nth_opt args 2) in
  match (mode_filter, day_filter) with
  | (Some(mode_filter), Some(day_filter)) when day_filter <> day && mode_filter <> mode -> ()
  | (Some(mode_filter), _) when mode_filter <> mode -> ()
  | (_, Some(day_filter)) when day_filter <> day -> ()
  | _ -> exec fn day part mode input result


(* 
   --- DAY ONE ---
*)
let day01_input = Ocaml.File.read "../input/day01.txt"
let day01_test_input = Ocaml.File.read "../input/day01_test.txt"
let () = run ~day:"01" ~part:"1" ~mode:"test" ~input:day01_test_input ~fn:Ocaml.Day01_1.run ~result:11 
let () = run ~day:"01" ~part:"1" ~mode:"real" ~input:day01_input ~fn:Ocaml.Day01_1.run ~result:2166959
let () = run ~day:"01" ~part:"2" ~mode:"test" ~input:day01_test_input ~fn:Ocaml.Day01_2.run ~result:31
let () = run ~day:"01" ~part:"2" ~mode:"real" ~input:day01_input ~fn:Ocaml.Day01_2.run ~result:23741109

(* 
   --- DAY TWO ---
*)
let day02_input = Ocaml.File.read "../input/day02.txt"
let day02_test_input = Ocaml.File.read "../input/day02_test.txt"
let day02_test_input_2 = Ocaml.File.read "../input/day02_test_2.txt"
let () = run ~day:"02" ~part:"1" ~mode:"test" ~input:day02_test_input ~fn:Ocaml.Day02_1.run ~result:2
let () = run ~day:"02" ~part:"1" ~mode:"real" ~input:day02_input ~fn:Ocaml.Day02_1.run ~result:402
let () = run ~day:"02" ~part:"2" ~mode:"test" ~input:day02_test_input ~fn:Ocaml.Day02_2.run ~result:4
let () = run ~day:"02" ~part:"2" ~mode:"test" ~input:day02_test_input_2 ~fn:Ocaml.Day02_2.run ~result:16
let () = run ~day:"02" ~part:"2" ~mode:"real" ~input:day02_input ~fn:Ocaml.Day02_2.run ~result:455

(* 
   --- DAY THREE ---
*)
let day03_input = Ocaml.File.read "../input/day03.txt"
let day03_test_input = Ocaml.File.read "../input/day03_test.txt"
let day03_test_input_2 = Ocaml.File.read "../input/day03_test_2.txt"
let () = run ~day:"03" ~part:"1" ~mode:"test" ~input:day03_test_input ~fn:Ocaml.Day03_1.run ~result:161
let () = run ~day:"03" ~part:"1" ~mode:"real" ~input:day03_input ~fn:Ocaml.Day03_1.run ~result:160672468
let () = run ~day:"03" ~part:"2" ~mode:"test" ~input:day03_test_input_2 ~fn:Ocaml.Day03_2.run ~result:48
let () = run ~day:"03" ~part:"2" ~mode:"real" ~input:day03_input ~fn:Ocaml.Day03_2.run ~result:84893551

(* 
  --- DAY FOUR ---
*)
let day04_input = Ocaml.File.read "../input/day04.txt"
let day04_test_input = Ocaml.File.read "../input/day04_test.txt"
let day04_test_input_2 = Ocaml.File.read "../input/day04_test_2.txt"
let () = run ~day:"04" ~part:"1" ~mode:"test" ~input:day04_test_input ~fn:Ocaml.Day04_1.run ~result:18
let () = run ~day:"04" ~part:"1" ~mode:"real" ~input:day04_input ~fn:Ocaml.Day04_1.run ~result:2549
let () = run ~day:"04" ~part:"2" ~mode:"test" ~input:day04_test_input_2 ~fn:Ocaml.Day04_2.run ~result:9
let () = run ~day:"04" ~part:"2" ~mode:"real" ~input:day04_input ~fn:Ocaml.Day04_2.run ~result:2003

(* 
  --- DAY FIVE ---
*)
let day05_test_input = Ocaml.File.read "../input/day05_test.txt"
let day05_input = Ocaml.File.read "../input/day05.txt"
let () = run ~day:"05" ~part:"1" ~mode:"test" ~input:day05_test_input ~fn:Ocaml.Day05_1.run ~result:143
let () = run ~day:"05" ~part:"1" ~mode:"real" ~input:day05_input ~fn:Ocaml.Day05_1.run ~result:5639
let () = run ~day:"05" ~part:"2" ~mode:"test" ~input:day05_test_input ~fn:Ocaml.Day05_2.run ~result:123
let () = run ~day:"05" ~part:"2" ~mode:"real" ~input:day05_input ~fn:Ocaml.Day05_2.run ~result:5273

(* 
  --- DAY SIX ---
*)
let day06_input = Ocaml.File.read "../input/day06.txt" 
let day06_test_input = Ocaml.File.read "../input/day06_test.txt"
let () = run ~day:"06" ~part:"1" ~mode:"test" ~input:day06_test_input ~fn:Ocaml.Day06_1.run ~result:41
let () = run ~day:"06" ~part:"1" ~mode:"real" ~input:day06_input ~fn:Ocaml.Day06_1.run ~result:5461
let () = run ~day:"06" ~part:"2" ~mode:"test" ~input:day06_test_input ~fn:Ocaml.Day06_2.run ~result:6
let () = run ~day:"06" ~part:"2" ~mode:"real" ~input:day06_input ~fn:Ocaml.Day06_2.run ~result:1836

(* 
  --- DAY SEVEN ---
*)
let day07_test_input = Ocaml.File.read "../input/day07_test.txt"
let day07_input = Ocaml.File.read "../input/day07.txt"
let () = run ~day:"07" ~part:"1" ~mode:"test" ~input:day07_test_input ~fn:Ocaml.Day07_1.run ~result:3749
let () = run ~day:"07" ~part:"1" ~mode:"real" ~input:day07_input ~fn:Ocaml.Day07_1.run ~result:465126289353
let () = run ~day:"07" ~part:"2" ~mode:"test" ~input:day07_test_input ~fn:Ocaml.Day07_2.run ~result:11387
let () = run ~day:"07" ~part:"2" ~mode:"real" ~input:day07_input ~fn:Ocaml.Day07_2.run ~result:70597497486371

(* 
  --- DAY EIGHT ---
*)
let day08_test_input_3 = Ocaml.File.read "../input/day08_test_3.txt"
let day08_test_input_2 = Ocaml.File.read "../input/day08_test_2.txt"
let day08_test_input = Ocaml.File.read "../input/day08_test.txt"
let day08_input = Ocaml.File.read "../input/day08.txt"
let () = run ~day:"08" ~part:"1" ~mode:"test" ~input:day08_test_input_2 ~fn:Ocaml.Day08_1.run ~result:4
let () = run ~day:"08" ~part:"1" ~mode:"test" ~input:day08_test_input ~fn:Ocaml.Day08_1.run ~result:14
let () = run ~day:"08" ~part:"1" ~mode:"real" ~input:day08_input ~fn:Ocaml.Day08_1.run ~result:299
let () = run ~day:"08" ~part:"2" ~mode:"test" ~input:day08_test_input ~fn:Ocaml.Day08_2.run ~result:34
let () = run ~day:"08" ~part:"2" ~mode:"test" ~input:day08_test_input_3 ~fn:Ocaml.Day08_2.run ~result:9
let () = run ~day:"08" ~part:"2" ~mode:"real" ~input:day08_input ~fn:Ocaml.Day08_2.run ~result:1032

(* 
  --- DAY NINE ---
*)
let day09_test_input = Ocaml.File.read "../input/day09_test.txt"
let day09_input = Ocaml.File.read "../input/day09.txt"
let () = run ~day:"09" ~part:"1" ~mode:"test" ~input:day09_test_input ~fn:Ocaml.Day09_1.run ~result:1928
let () = run ~day:"09" ~part:"1" ~mode:"real" ~input:day09_input ~fn:Ocaml.Day09_1.run ~result:6320029754031
let () = run ~day:"09" ~part:"2" ~mode:"test" ~input:day09_test_input ~fn:Ocaml.Day09_2.run ~result:2858
let () = run ~day:"09" ~part:"2" ~mode:"real" ~input:day09_input ~fn:Ocaml.Day09_2.run ~result:6347435485773

(* 
  --- DAY TEN ---
*)
let day10_test_input = Ocaml.File.read "../input/day10_test.txt"
let day10_input = Ocaml.File.read "../input/day10.txt"
let () = run ~day:"10" ~part:"1" ~mode:"test" ~input:day10_test_input ~fn:Ocaml.Day10_1.run ~result:36
let () = run ~day:"10" ~part:"1" ~mode:"real" ~input:day10_input ~fn:Ocaml.Day10_1.run ~result:674
let () = run ~day:"10" ~part:"2" ~mode:"test" ~input:day10_test_input ~fn:Ocaml.Day10_2.run ~result:81
let () = run ~day:"10" ~part:"2" ~mode:"real" ~input:day10_input ~fn:Ocaml.Day10_2.run ~result:1372


(* THE END *)
let () = print_endline ""
