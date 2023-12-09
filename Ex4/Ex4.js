let slideIndex = 1;
let slideInterval;

var slideshowContainer = document.getElementById("slideshow-container");
var imageUrls = [
  "https://images.pexels.com/photos/325200/pexels-photo-325200.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/401213/pexels-photo-401213.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/586570/pexels-photo-586570.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "https://images.pexels.com/photos/459301/pexels-photo-459301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
];

for (var i = 0; i < imageUrls.length; i++) {
  var mySlide = document.createElement("div");
  mySlide.className = "mySlides fade";

  var img = document.createElement("img");
  img.src = imageUrls[i];
  img.style.width = "100%";

  mySlide.appendChild(img);
  slideshowContainer.appendChild(mySlide);
}

// Create dots dynamically
var centerDiv = document.createElement("div");
centerDiv.style.textAlign = "center";

for (var i = 0; i < imageUrls.length; i++) {
  var dot = document.createElement("span");
  dot.className = "dot";
  dot.setAttribute("onclick", "currentSlide(" + (i + 1) + ")");
  centerDiv.appendChild(dot);
}

// Append centerDiv to the body
document.body.appendChild(centerDiv);

// Display the first slide
showSlides(1);

// Thêm slideshow tự động với khoảng thời gian 2 giây
slideInterval = setInterval(function () {
  plusSlides(1);
}, 4000);

function plusSlides(n) {
  //clearInterval(slideInterval); // Dừng chuyển động tự động khi chuyển trang thủ công
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  //clearInterval(slideInterval); // Dừng chuyển động tự động khi chuyển trang thủ công
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
