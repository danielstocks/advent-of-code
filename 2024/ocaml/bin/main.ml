(* 
   --- DAY ONE ---
*)

(* Right answer: 11 *)
let day01_1_test = Ocaml.Day01_1.run Ocaml.Day01_1.test_input
let () = Printf.printf "\nDay 01, Part 1, Test Result: %d" day01_1_test

(* Right answer: 2166959 *)
let day01_1 = Ocaml.Day01_1.run Ocaml.Day01_1.input
let () = Printf.printf "\nDay 01, Part 1, Real Result: %d" day01_1

(* Right answer: 31 *)
let day01_2_test = Ocaml.Day01_2.run Ocaml.Day01_2.test_input
let () = Printf.printf "\nDay 01, Part 2, Test Result: %d" day01_2_test

(* Right answer: 23741109 *)
let day01_2 = Ocaml.Day01_2.run Ocaml.Day01_2.input
let () = Printf.printf "\nDay 01, Part 2, Real Result: %d" day01_2

let () = print_endline ""

(* 
   --- DAY TWO ---
*)

(* Right answer: 2 *)
let day02_1_test = Ocaml.Day02_1.run Ocaml.Day02_1.test_input
let () = Printf.printf "\nDay 02, Part 1, Test Result: %d" day02_1_test

(* Right answer: 402 *)
let day02_1 = Ocaml.Day02_1.run Ocaml.Day02_1.input
let () = Printf.printf "\nDay 02, Part 1, Real Result: %d" day02_1

(* Right answer: 4 *)
let day02_2_test = Ocaml.Day02_2.run Ocaml.Day02_2.test_input
let () = Printf.printf "\nDay 02, Part 2, Test Result: %d" day02_2_test

(* Right answer: 455 *)
let day02_2 = Ocaml.Day02_2.run Ocaml.Day02_2.input
let () = Printf.printf "\nDay 02, Part 2, Real Result: %d" day02_2

let () = print_endline ""

(* 
   --- DAY THREE ---
*)

(* Right answer: 161 *)
let day03_1_test = Ocaml.Day03_1.run Ocaml.Day03_1.test_input
let () = Printf.printf "\nDay 03, Part 1, Test Result: %d" day03_1_test

(* Right answer: 160672468 *)
let day03_1 = Ocaml.Day03_1.run Ocaml.Day03_1.input
let () = Printf.printf "\nDay 03, Part 1, Real Result: %d" day03_1

(* Right answer: 48 *)
let day03_2_test = Ocaml.Day03_2.run Ocaml.Day03_2.test_input
let () = Printf.printf "\nDay 03, Part 2, Test Result: %d" day03_2_test

(* Right answer: ? *)
let day03_2 = Ocaml.Day03_2.run Ocaml.Day03_2.input
let () = Printf.printf "\nDay 03, Part 2, Real Result: %d" day03_2

let () = print_endline ""


(* 
   --- DAY FOUR ---
*)

(* Load input *)
let day04_input = Ocaml.File.read "../input/day04.txt"
let day04_test_input = Ocaml.File.read "../input/day04_test.txt"

(* Right answer: 18 *)
let day04_1_test = Ocaml.Day04_1.run day04_test_input
let () = Printf.printf "\nDay 04, Part 1, Test Result: %d" day04_1_test

(* Right answer: 2549 *)
let day04_1 = Ocaml.Day04_1.run day04_input
let () = Printf.printf "\nDay 04, Part 1, Real Result: %d" day04_1;

assert (day04_1 = 2548)

let () = print_endline ""
