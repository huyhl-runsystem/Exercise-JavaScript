const numberSelector = document.getElementById("numberSelector");
const cityList = document.getElementById("cityItems");
const items = cityList.children;

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

  const cities = [
    "Hà Nội",
    "Hồ Chí Minh",
    "Đà Nẵng",
    "Huế",
    "Hải Phòng",
    "Nha Trang",
  ];

  options.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.value = option.value;
    optionElement.text = option.text;
    numberSelector.add(optionElement);
  });

  cities.forEach((city, index) => {
    const listItem = document.createElement("li");
    listItem.classList.add("item");
    listItem.textContent = `${index + 1}.${city}`;
    cityList.appendChild(listItem);
  });

  numberSelector.addEventListener("change", function () {
    highlightRows(this.value, items);
  });

  const itemMappings = {
    one: 0,
    two: 1,
    three: 2,
    four: 3,
    five: 4,
    six: 5,
    even: (i) => i % 2 === 1,
    odd: (i) => i % 2 === 0,
  };

  function setItemBackground(index, color) {
    if (index >= 0 && index < items.length) {
      items[index].style.backgroundColor = color;
    }
  }

  function highlightRows(selectedValue, items) {
    for (var i = 0; i < items.length; i++) {
      items[i].style.backgroundColor = "";
    }

    const mappingFunction = itemMappings[selectedValue];

    if (typeof mappingFunction === "number") {
      setItemBackground(mappingFunction, "yellow");
    } else if (typeof mappingFunction === "function") {
      for (let i = 0; i < items.length; i++) {
        if (mappingFunction(i)) {
          setItemBackground(i, "yellow");
        }
      }
    }
  }
});
