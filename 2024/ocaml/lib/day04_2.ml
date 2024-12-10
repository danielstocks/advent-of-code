(*

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........

Do a full grid scan & run through each character
if character = A:
  look around for an M
  if M found:
    Look opposite for an S
    if S found:
      X-MAS = True
  look around: North (-1, 0) South(1, 0), East(0,1), West(0,-1)
  if M at North, check if S at South
*)


let run _ = 1
