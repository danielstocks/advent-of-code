let day00_test = Ocaml.Day00.run()
let () = Printf.printf "\nDay 00, Test Result: %d" day00_test

(* Right answer: 11 *)
let day01_1_test = Ocaml.Day01_1.run Ocaml.Day01_1.test_input
let () = Printf.printf "\nDay 01, Part 1, Test Result: %d" day01_1_test

(* Right answer: 2166959 *)
let day01_1 = Ocaml.Day01_1.run Ocaml.Day01_1.input
let () = Printf.printf "\nDay 01, Part 1, Real Result: %d" day01_1

(* Right answer: 31 *)
let day01_2_test = Ocaml.Day01_2.run Ocaml.Day01_2.test_input
let () = Printf.printf "\nDay 01, Part 2, Test Result: %d" day01_2_test

(* Right answer: 2166959 *)
let day01_2 = Ocaml.Day01_2.run Ocaml.Day01_2.input
let () = Printf.printf "\nDay 01, Part 2, Real Result: %d" day01_2

let () = print_endline "\n"
