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
