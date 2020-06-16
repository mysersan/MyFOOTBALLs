document.addEventListener("DOMContentLoaded", function() {
  // Activate sidebar nav
  const elems = document.querySelectorAll(".sidenav");
  M.Sidenav.init(elems);
  loadNav();

  function loadNav() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        if (this.status != 200) return;

        // Muat daftar tautan menu
        document.querySelectorAll(".topnav, .sidenav").forEach(function(elm) {
          elm.innerHTML = xhttp.responseText;
        });

        // Daftarkan event listener untuk setiap tautan menu
        document
          .querySelectorAll(".sidenav a, .topnav a")
          .forEach(function(elm) {
            elm.addEventListener("click", function(event) {
              // Tutup sidenav
              const sidenav = document.querySelector(".sidenav");
              M.Sidenav.getInstance(sidenav).close();

              // Muat konten halaman yang dipanggil
              page = event.target.getAttribute("href").substr(1);
              loadPage(page);
            });
          });
      }
    };
    xhttp.open("GET", "nav.html", true);
    xhttp.send();
  }

  // Load page content
  var page = window.location.hash.substr(1);
  if (page == "") page = "home";
  loadPage(page);

  function loadPage(page) {
    // fetch('pages/' + page + '.html')
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4) {
        const content = document.querySelector("#body-content");
        
        if (page === "home") {
          getKlasemen();
        } else if (page === "saved") {
          getSavedFavoriteTeam();
        } else if (page === "match") {
          getMatchByIdLeague();
        }

        if (this.status == 200) {
          content.innerHTML = xhttp.responseText;
        } else if (this.status == 404) {
          content.innerHTML = "<p>Halaman tidak ditemukan.</p>";
        } else {
          content.innerHTML = "<div class="card">
  <div class="card-image waves-effect waves-block waves-light purple lighten-5">
    <img class="activator" src="img/icon/judul.png">
  </div>
  <div class="card-content">
    <span class="card-title activator grey-text text-darken-4"><h4>Home<a href="#home"><i class="material-icons right">autorenew</i></a></h4></span>
  </div> 		
</div> ";
        }
      }

      //materialbox
          const materialbox = document.querySelectorAll('.materialboxed');
          M.Materialbox.init(materialbox);
          
    };
    xhttp.open("GET", "pages/" + page + ".html", true);
    xhttp.send();
  }
});
