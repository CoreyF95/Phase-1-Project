const players = document.getElementById("players");
const teams = document.getElementById("teams")
const playerList = document.getElementById("player-list")
const teamList = document.getElementById("team-list")
const vote = document.getElementsByTagName("button")
const submit = document.getElementById("submit")
const container = document.getElementById("container")
const player_List = document.getElementsByClassName("playerList")
const team_List = document.getElementsByClassName("teamList")
let counter = 0;



submit.addEventListener("click", () => {
    arr = [...playerList.children]
    arr.sort((a, b) => {
        const voteA = parseInt(a.children[0].children[6].innerText);
        const voteB = parseInt(b.children[0].children[6].innerText);
        if (voteA > voteB) {
            return -1
        } else {
            return 1
        }
    })
    debugger
    playerList.children
    playerList.innerHTML = ``;
    teamList.innerHTML = ``;
    if (container.children.length === 5) {
        const mvp = document.createElement("p")
        mvp.id = "mvp"
        mvp.innerHTML = `
        <div style="color: rgb(200, 200, 200);
        width: 750px; align-items: center; padding-left: 375px;
        padding-top: 50px; height: 150px; font-size: 80px;
        color: black;">${arr[0].children[0].children[0].innerText}<div/>
        `
        container.appendChild(mvp)
    } else {
        container.removeChild(mvp)
    }
})

players.addEventListener("click", () => {
    teamList.innerHTML = ``;
    reset();
    if (container.children[2].children.length === 0) {
        fetch("https://www.balldontlie.io/api/v1/players")
        .then((resp) => resp.json())
        .then((playerData) => playerData.data.forEach(player => renderPlayer(player)))
    } else {container.children[2].innerHTML = ``}
})

teams.addEventListener("click", () => {
    playerList.innerHTML = ``;
    if (container.children[4].children.length === 0) {
        fetch("https://www.balldontlie.io/api/v1/teams")
            .then((resp) => resp.json())
            .then((teamData) => teamData.data.forEach(team => renderTeam(team)))
    } else { container.children[4].innerHTML = `` }
})

function reset() {
    counter = 0;
}


function renderPlayer(player) {
    let newPlayer = document.createElement("p");
    newPlayer.className = "card";
    newPlayer.innerHTML = `
    <div style="background-color: rgb(255, 255, 255, 0.75); width: 300px; padding-left: 10px; border-top: 1px; padding-bottom: 1px">
    <p style="font-size: 32px">${player.first_name + " " + player.last_name}</p>
    <p>
    <p style="font-size: 28px">Team: ${player.team.full_name}</p>
    <p/>
    <p style="font-size: 30px">Position: ${player.position}</p>
    <p>  
    <p id=votes-${vote.length + 1} data-id=${vote.length + 1} style="font-size: 20px">${counter}<p/>
    <button id=voteButton-${vote.length + 1} style="font-size: 14px">Vote</>
    <div/>
    `
    playerList.appendChild(newPlayer);
}

document.addEventListener("click", (e) => {
    if (e.target.id.split("-")[0] === "voteButton") {
        if (e.target.previousSibling.parentNode.previousElementSibling.innerText === "0") {
            reset();
            e.target.previousSibling.parentNode.previousElementSibling.innerText = counter + 1;
        }
        else {
            counter++;
            e.target.previousSibling.parentNode.previousElementSibling.innerText = parseInt(e.target.previousSibling.parentNode.previousElementSibling.innerText) + 1;
        }
    }
})

function renderTeam(team) {
    let newTeam = document.createElement("p");
    newTeam.className = "card";
    newTeam.innerHTML = `
        <div style="background-color: rgb(255, 255, 255, 0.75); width: 300px; padding-left: 20px; border-top: 1px; padding-bottom: 1px">
            <h4 style="font-size: 32px">${team.full_name}</h4>
            <p>
                <span style="font-size: 28px">${team.conference}ern Conference</span>
            <p />
            <p style="font-size: 28px">${team.division} Division</p>
        </div>
    `
    teamList.appendChild(newTeam);
}
