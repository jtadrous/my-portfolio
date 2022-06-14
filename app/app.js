function loadData() {
  //jquery way if you have the data in an external json file
  $.getJSON("../data/data.json", function (projects) {
    console.log("working");
    var design, art;
    design = projects.design_work;
    art = projects.art_work;
  }).fail(function (jqxhr, textStatus, error) {
    //to check if this works, change the double quotes around one of the keys to single quotes
    //or mess up the file path above
    //you could also look at your data in the browser at http://localhost:5000/data/data.json
    console.log(jqxhr);
    console.log(textStatus + " -- " + error);
  });
}

function initListeners() {
  //Code similar to tutorial at https://www.w3schools.com/howto/howto_js_dropdown.asp
  $(".dropbtn").click(function () {
    document.getElementById("myDropdown").classList.toggle("show");
  });

  //Close the dropdown if the user clicks outside of it
  $(window).click(function (e) {
    if (!e.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  });

  //When the user scrolls down far enough on the page, a box-shadow shows up behind the navigation bar
  $(window).scroll(function () {
    let header = this.document.querySelector("nav");
    header.classList.toggle("scrolling-active", window.scrollY > 54);
  });
}

$(document).ready(function () {
  try {
    initListeners();
    loadData();
  } catch {
    console.error(e);
  }
});
