const numberSelector = document.getElementById("numberSelector");
const cityItems = document.getElementsByClassName("item");

document.addEventListener("DOMContentLoaded", function () {
  numberSelector.addEventListener("change", function () {
    highlightRows(this.value, cityItems);
  });

  function highlightRows(selectedValue, items) {
    for (var i = 0; i < items.length; i++) {
      items[i].style.backgroundColor = "";
    }

    switch (selectedValue) {
      case "one":
        items[0].style.backgroundColor = "yellow";
        break;
      case "two":
        items[1].style.backgroundColor = "yellow";
        break;
      case "three":
        items[2].style.backgroundColor = "yellow";
        break;
      case "four":
        items[3].style.backgroundColor = "yellow";
        break;
      case "five":
        items[4].style.backgroundColor = "yellow";
        break;
      case "six":
        items[5].style.backgroundColor = "yellow";
        break;
      case "even":
        for (var i = 1; i < items.length; i += 2) {
          items[i].style.backgroundColor = "yellow";
        }
        break;
      case "odd":
        for (var i = 0; i < items.length; i += 2) {
          items[i].style.backgroundColor = "yellow";
        }
        break;
      case "reset":
        break;
    }
  }
});
