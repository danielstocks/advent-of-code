let time_function f x =
  let start = Sys.time () in
  let result = f x in
  let finish = Sys.time () in
  let ms = (finish -. start) *. 1000.0 in
  (result, ms)
