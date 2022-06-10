// Code similar to tutorial at https://www.w3schools.com/howto/howto_js_dropdown.asp

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it
window.onclick = function (event) {
  if (!event.target.matches(".dropbtn")) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains("show")) {
        openDropdown.classList.remove("show");
      }
    }
  }
};

/* When the user scrolls down far enough on the page,
a box-shadow shows up behind the navigation bar */
window.addEventListener("scroll", function () {
  let header = this.document.querySelector("nav");
  header.classList.toggle("scrolling-active", window.scrollY > 54);
});
aos.init();
