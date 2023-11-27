const numberSelector = document.getElementById("numberSelector");
const cityItems = document.getElementsByClassName("item");

document.addEventListener("DOMContentLoaded", function () {
  const options = [
    { value: "", text: "" },
    { value: "one", text: "1" },
    { value: "two", text: "2" },
    { value: "three", text: "3" },
    { value: "four", text: "4" },
    { value: "five", text: "5" },
    { value: "six", text: "6" },
    { value: "even", text: "Chẵn" },
    { value: "odd", text: "Lẻ" },
    { value: "reset", text: "Reset" },
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.text = option.text;
    numberSelector.add(optionElement);
  });

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
