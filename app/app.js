var design, art;

function loadData() {
  //jquery way if you have the data in an external json file
  $.getJSON("../data/data.json", function (projects) {
    console.log("working");
    design = projects.websites;
    art = projects.design;
    console.log(design);
    console.log(art);
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

  //Close the dropdown menu if the user clicks outside of it
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

  //When the user scrolls down far enough on the page, a css class is added to create a box-shadow behind the navigation bar
  $(window).scroll(function () {
    let header = this.document.querySelector("nav");
    header.classList.toggle("scrolling-active", window.scrollY > 54);
  });

  //When the user selects an image from the gallery on either the design page or the artwork page, it will update the text at the top to show information about that specific project
  $(".gallery img").click(function (e) {
    let selected = e.target.id;
    let currPage;
    if (e.target.className === "des") {
      currPage = design;
    } else {
      currPage = art;
    }

    for (let i = 0; i < currPage.length; i++) {
      if (currPage[i].id === selected) {
        console.log(currPage[i].title);
        $("#selected").empty();
        let content =
          `<img src="` +
          currPage[i].image +
          `" alt="` +
          currPage[i].title +
          `" />
          <div class="info"><h3>` +
          currPage[i].title +
          `</h3>
        <em><h4>` +
          currPage[i].sub +
          `</h4></em><br />
        <p>` +
          currPage[i].desc +
          `
        </p>
        <br />
        <a href="` +
          currPage[i].link +
          `"><button>View</button></a></div>`;
        $("#selected").html(content);
        //$(window).scrollTop(120);
        $("html, body").animate({ scrollTop: "120" }, 800);
      }
    }
  });
}

$(document).ready(function () {
  try {
    loadData();
    initListeners();
  } catch {
    console.error(e);
  }
});
