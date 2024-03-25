function a() {
  console.log("calling a");
  return false;
}

function b() {
  console.log("calling b");
  return true;
}

if (a() && b()) {
  console.log("yay");
}

function intersect(arr1: number[][], arr2: number[][]) {
  return arr1.filter((item) => {
    return arr2.includes(item);
  });
}

// TODO: Write aboutComparing/Passing objects by reference, not value and
// how it leads to subtle bugs

var x = [1, 0];

console.log("wtf?", intersect([x], [x]));
