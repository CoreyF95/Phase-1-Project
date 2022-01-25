const players = document.getElementById("players");
const teams = document.getElementById("teams")
const playerList = document.getElementById("player-list")
const teamList = document.getElementById("team-list")
const vote = document.getElementsByClassName("vote-button")



players.addEventListener("click", () => {
    fetch("https://www.balldontlie.io/api/v1/players")
        .then((resp) => resp.json())
        .then((playerData) => playerData.data.forEach(player => renderPlayer(player)))
})

teams.addEventListener("click", () => {
    fetch("https://www.balldontlie.io/api/v1/teams")
        .then((resp) => resp.json())
        .then((teamData) => teamData.data.forEach(team => renderTeam(team)))
})

function counter() {
    let count = 0
    return count++
}

function renderPlayer(player) {
    console.log(player)
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
                <p style="font-size: 20px">Votes: ${counter()}<p/>
                <button className="vote-button" style="font-size: 14px">Vote
            <span/>
    `
    playerList.appendChild(newPlayer);
}

function renderTeam(team) {
    console.log(team)
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