function resultMatchJSON(data) {
  var dataMatchesHtml = '';
  var match = data.matches;
  var maxLoopData = match.length;

  //Membatasi maksimal pertandingan yang di tampilkan di card content
  if (match.length > 20) {
    maxLoopData = 20;
  }

  for (let i = 0; i < maxLoopData; i++) {
    dataMatchesHtml += `
        <div class="col s12 m6 l6">
            <div class="card purple lighten-5">
            <div class="card-content ">
            <div center-align>
        <div class="right-align">
        </div>
        <h4 class="center-align">Matchday: ${match[i].matchday}</h4>
        <div class="center-align">Kick Off: ${convertUTCDate(new Date(match[i].utcDate))}</div>
        <div class="row" style="margin:20px">
        <div class="col s5 truncate right-align">
        <b><span class="pink-text text-darken-2">  ${match[i].homeTeam.name}</span>
        </div>
        <div class="col s2 ">
          VS
        </div>
        <div class="col s5 truncate left-align">
        <span class="purple-text text-darken-2">  ${match[i].awayTeam.name}</span></b>
        </div>
      </div>
    </div>
    </div>
    </div>
  </div>
      `
  }
  // Sisipkan komponen card ke dalam elemen
  document.getElementById("divMatches").innerHTML = dataMatchesHtml;
}
