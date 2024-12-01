let read filename =
  let ic = open_in filename in
  let length = in_channel_length ic in
  let content = really_input_string ic length in
  close_in ic;
  content
