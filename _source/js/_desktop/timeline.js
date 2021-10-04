$(document).ready(function() {});

function test(obj) {
  let array = document.querySelectorAll(".content"),
  colors=["present", "past"];
  for (let i = 0; i < array.length; ++i) {
      array[i].className = "content " + colors[obj.selectedIndex];
  }
}