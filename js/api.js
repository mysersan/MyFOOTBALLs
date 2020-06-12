var kode_liga = 2021
var base_url = "https://api.football-data.org/v2/";
var endpoint_tim = `${base_url}teams/`
var endpoint_klasemen = `${base_url}competitions/${kode_liga}/standings`
var endpoint_pertandingan_upcoming = `${base_url}competitions/${kode_liga}/matches?status=SCHEDULED`
var endpoint_pertandingan_detail = `${base_url}matches/`
var api_token = '6d3cb6ab6f474f188c188f4a040c49c1'

var fetchApi = url => {
  return fetch(url, {
    headers: {
      'X-Auth-Token': api_token
    }
  });
}

// Blok kode yang akan di panggil jika fetch berhasil
function status(response) {
  if (response.status !== 200) {
    console.log("Error : " + response.status);
    // Method reject() akan membuat blok catch terpanggil
    return Promise.reject(new Error(response.statusText));
  } else {
    // Mengubah suatu objek menjadi Promise agar bisa "di-then-kan"
    return Promise.resolve(response);
  }
}

// Blok kode untuk memparsing json menjadi array JavaScript
function json(response) {
  return response.json();
}

// Blok kode untuk meng-handle kesalahan di blok catch
function error(error) {
  // Parameter error berasal dari Promise.reject()
  console.log("Error : " + error);
}

//Memanggil API standing 
let request = new Request(endpoint_klasemen, {
  headers: new Headers({
    'X-Auth-Token' : api_token
  })
});

// Blok kode untuk melakukan request data json
function getKlasemen() {
  fetch(request)
    .then(status)
    .then(json)
    .then(function(data) {
      // Menampilkan data klasemen
      var klasemenHTML =  `
		  <div class="card">
      <div class="card-content">
      <h5 class="header">Last Updated: ${convertUTCDate(new Date(data.competition.lastUpdated))}</h5> 
              <table style="font-size:14;" class="striped responsive-table">
                <thead>
                  <tr>
                      <th class="center-align">#</th>
                      <th class="center-align">Team</th>
                      <th class="center-align">Name</th>
                      <th class="center-align">P</th>
                      <th class="center-align">W</th>
                      <th class="center-align">D</th>
                      <th class="center-align">L</th>
                      <th class="center-align">F</th>
                      <th class="center-align">A</th>
                      <th class="center-align">GD</th>
                      <th class="center-align">Pts</th>
                  </tr>
                </thead>
                <tbody>
          `;
        data.standings["0"].table.forEach(function(item) {
          item = JSON.parse(JSON.stringify(item).replace(/http:/g, 'https:'));
          klasemenHTML += `
                  <tr>
                    <td class="center-align">${item.position}</td>
                    <td class="center-align"><a href="./team.html?id=${item.team.id}"><img style="width:13px;" alt="${item.team.name}" src="${item.team.crestUrl}"></a></td>
                    <td class="center-align"><a href="./team.html?id=${item.team.id}">${item.team.name}</a></td>
                    <td class="center-align">${item.playedGames}</td>
                    <td class="center-align">${item.won}</td>
                    <td class="center-align">${item.draw}</td>
                    <td class="center-align">${item.lost}</td>
                    <td class="center-align">${item.goalsFor}</td>
                    <td class="center-align">${item.goalsAgainst}</td>
                    <td class="center-align">${item.goalDifference}</td>
                    <td class="center-align">${item.points}</td>
                  </tr>
          `;
      });
      klasemenHTML += `</tbody>
              </table>`;

      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("klasemen").innerHTML = klasemenHTML;
    })
    .catch(error);
}

function getTeamById() {
  return new Promise(function(resolve, reject) {

  // Ambil nilai query parameter (?id=)
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");

  //Memanggil API team
  var request = new Request(endpoint_tim + idParam, {
    headers: new Headers({
      'X-Auth-Token' : api_token
    })
  });

  if ("caches" in window) {
      caches.match(request).then(function(response) {
        if (response) {
          response.json().then(function(data) {
            // Menyusun komponen card artikel secara dinamis
            var teamHTML = `
            <div class="card">
              <div class="col s12 m6">
                <div class="row">
                <h4 class="light center grey-text text-darken-3"><b>${data.name}</b></h4>
                 </div>
              </div>
              </div>
            `;
            // Sisipkan komponen card ke dalam elemen dengan id #content
            document.getElementById("body-content").innerHTML = teamHTML;
            // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
            resolve(data);
          });
        }
      });
    }
  fetch(request)
    .then(status)
    .then(json)
    .then(function(data) {
      data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
      console.log(data);
      // tampilkan data detail team
      var teamHTML = `
      <div class="card">
      <div class="col m6 s12">
            <div class="card-panel center waves-light purple lighten-5">
              <h4 class="light center grey-text text-darken-3"><img style="width:30px;" alt="${data.name}" src="${data.crestUrl}"> <b>${data.name}</b></h4>
              <p align="center">Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Venue : ${data.venue}</p>
              </div>
              <div class="col m6 s12">
              <div class="card-panel center purple darken-4 white-text">
              <h5>Competitions</h5>
              <p>
            <ul>
                
        `;
        data.activeCompetitions.forEach(function(item) {
        teamHTML += `
                  <li>${item.name}</li>
                    `;
        });
        teamHTML += `
            </ul>
              </p>
            </div>
            </div>
            </div>
            <div class="card">
            <div class="col m6 s12">
            <div class="card-panel center pink accent-4 white-text">
              <h5>Teams</h5>
                <table>
                    `;
        data.squad.forEach(function(item) {
        teamHTML += `
                  <tr>
                    <td class="center-align">${item.name} (${item.position})</td>
                  </tr>
                    `;
        });
        teamHTML += `
                </table>
            </div>
          </div>
        </div>
        </div>
                    `;
      // Sisipkan komponen card ke dalam elemen dengan id #content
      document.getElementById("body-content").innerHTML = teamHTML;
      // Kirim objek data hasil parsing json agar bisa disimpan ke indexed db
      resolve(data);

    });
  });
}

function getSavedFavoriteTeam() {
  getAll().then(function(team) {
    console.log(team);
    // Menampilkan data favorite team
    var teamHTML = `<div class="card">
    <div class="card-image waves-effect waves-block waves-light purple lighten-5">
      <img class="activator" src="img/icon/covid19.png">
    </div>
    <div class="card-content">
    <p>Shareholders discussed season return, financial help to clubs and to NHS in fighting coronavirus and aid to EFL and National League clubs. <a href="https://www.premierleague.com/news/1651836"><b> @premierleague.com</b></a></p>
      <span class="card-title activator grey-text text-darken-4"><h4>Favorite Team<a href="#"><i class="material-icons right">autorenew</i></a></h4></span>
    </div> 		
    </div> 
                    `;
    team.forEach(function(data) {
      data = JSON.parse(JSON.stringify(data).replace(/http:/g, 'https:'));
      teamHTML += `
                  <div class="col s12 m6 l3">
                    <div class="card">
                      <div class="card-content">
                        <span class="card-title activator grey-text text-darken-4 "><img style="width:25px;" alt="${data.name}" src="${data.crestUrl}"> ${data.name}<i class="material-icons right">more_vert</i></span>
                      </div>
                      <div class="card-action"><p><a href="./team_favorite.html?id=${data.id}&saved=true">Detail</a><a href="./team_favorite.html?id=${data.id}&delete=true">Delete</a></p></div>
                      <div class="card-reveal purple lighten-5">
                        <span class="card-title grey-text text-darken-4">${data.name}<i class="material-icons right">close</i></span>
                        <p>Founded : ${data.founded}<br>Club Colors : ${data.clubColors}<br>Venue : ${data.venue}</p>
                      </div>
                    </div>
                  </div>
                  
                `;
    });
    teamHTML += "</div>"
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;

  });
}

function getSavedFavoriteTeambyId() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  
  getById(idParam).then(function(team) {
    team = JSON.parse(JSON.stringify(team).replace(/http:/g, 'https:'));
    console.log(team);
    teamHTML = '';
    var teamHTML = `
    <div class="card">
    <div class="col m6 s12">
          <div class="card-panel center waves-light purple lighten-5">
            <h4 class="light center grey-text text-darken-3"><img style="width:30px;" alt="${team.name}" src="${team.crestUrl}"> <b>${team.name}</b></h4>
            <p align="center">Founded : ${team.founded}<br>Club Colors : ${team.clubColors}<br>Venue : ${team.venue}</p>
           </div>
        <div class="col m6 s12">
          <div class="card-panel center purple darken-4 white-text">
            <h5>Competitions</h5>
            <p>
              <ul>
    `;
    team.activeCompetitions.forEach(function(item) {
    teamHTML += `
              <li>${item.name}</li>
                `;
    });
    teamHTML += `
              </ul>
              </p>
            </div>
          </div>
          </div>
          <div class="card">
          <div class="col m6 s12">
          <div class="card-panel center pink accent-4 white-text">
            <h5>Teams</h5>
              <table>
                    `;
    team.squad.forEach(function(item) {
    teamHTML += `
              <tr>
              <td class="center-align">${item.name} (${item.position})</td>
            </tr>
              `;
          });
          teamHTML += `
          </table>
         </div>
        </div>
      </div>
        </div>
                `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = teamHTML;

  });
}

function getDeleteFavoriteTeam() {
  var urlParams = new URLSearchParams(window.location.search);
  var idParam = urlParams.get("id");
  //hapus data team favorite indexed DB
  deleteFavoriteTeam(idParam).then(function(team) { });
    deleteHTML = '';
    var deleteHTML = `
    <div class="card">
      <div class="card-content">
        <span class="card-title">Team favorite berhasil dihapus</span>
      </div>
    </div>
  `;
    // Sisipkan komponen card ke dalam elemen dengan id #content
    document.getElementById("body-content").innerHTML = deleteHTML;
}

//Memanggil API match 
function getMatchByIdLeague() {
  return new Promise(function (resolve, reject) {

    if ('caches' in window) {
      caches.match(endpoint_pertandingan_upcoming).then(function (response) {
        if (response) {
          response.json().then(function (data) {
            resultMatchJSON(data);
            resolve(data);
          });
        }
      });
    }

    fetchApi(endpoint_pertandingan_upcoming)
      .then(status)
      .then(json)
      .then(function (data) {
        resultMatchJSON(data);
        resolve(data);

      })
      .catch(error);
  });
}





