const players = document.getElementById("players");
const teams = document.getElementById("teams")
const playerList = document.getElementById("player-list")
const teamList = document.getElementById("team-list")
const vote = document.getElementsByTagName("button")



players.addEventListener("click", () => {
    teamList.innerHTML = ``
    fetch("https://www.balldontlie.io/api/v1/players")
        .then((resp) => resp.json())
        .then((playerData) => playerData.data.forEach(player => renderPlayer(player)))
})

teams.addEventListener("click", () => {
    playerList.innerHTML = ``
    fetch("https://www.balldontlie.io/api/v1/teams")
        .then((resp) => resp.json())
        .then((teamData) => teamData.data.forEach(team => renderTeam(team)))
})




function renderPlayer(player) {
    let counter = 0
    let newPlayer = document.createElement("li");
    newPlayer.className = "card";
    newPlayer.innerHTML = `
        <div>
            <h4 style="font-size: 32px">${player.first_name + " " + player.last_name}</h4>
            <p>
                <span style="font-size: 28px">Team: ${player.team.full_name}</span>
            <p />
            <p style="font-size: 28px">Position: ${player.position}</p>
            <span>  
                <p id=votes-${vote.length + 1} data-id=${vote.length + 1} style="font-size: 20px">Votes: ${counter}<p/>
                <button id=voteButton-${vote.length + 1} style="font-size: 14px">Vote<span/>
    `
    playerList.appendChild(newPlayer);
}

document.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "voteButton")
        {console.log(e.target.id.split("-")[0])
        e.target.previousSibling.parentNode.previousElementSibling.innerText = ""
        console.log(e.target.previousElementSibling)
    }
})

function renderTeam(team) {
    let newTeam = document.createElement("li");
    newTeam.className = "card";
    newTeam.innerHTML = `
        <div>
            <h4 style="font-size: 32px">${team.full_name}</h4>
            <p>
                <span style="font-size: 28px">${team.conference}ern Conference</span>
            <p />
            <p style="font-size: 28px">${team.division} Division</p>
        </div>
    `
    teamList.appendChild(newTeam);
}
