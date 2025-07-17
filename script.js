
const words = {
  easy: ["alma", "tó", "macska", "asztal", "nap", "autó", "szék"],
  medium: ["hűtőgép", "csúszda", "medence", "trombita", "vacsora"],
  hard: ["önkormányzat", "forgalomirányító", "szénhidrát", "egyensúlyozás"]
};

let players = [];
let roles = [];
let currentPlayer = 0;
let secretWord = "";

function startGame() {
  const input = document.getElementById("playersInput").value.trim();
  players = input.split(",").map(p => p.trim());
  const impostorCount = parseInt(document.getElementById("impostorCount").value);
  const category = document.getElementById("categorySelect").value;
  secretWord = words[category][Math.floor(Math.random() * words[category].length)];

  roles = Array(players.length).fill("Tudja: " + secretWord);
  let impostors = [];
  while (impostors.length < impostorCount) {
    let rand = Math.floor(Math.random() * players.length);
    if (!impostors.includes(rand)) impostors.push(rand);
  }
  for (let i of impostors) {
    roles[i] = "Te vagy az imposztor! Tipp: piros";
  }

  document.getElementById("setup").style.display = "none";
  document.getElementById("game").style.display = "block";
  showPlayer();
}

function showPlayer() {
  document.getElementById("roleDisplay").style.display = "none";
  document.getElementById("nextBtn").style.display = "none";
  document.getElementById("playerTurn").innerText = players[currentPlayer] + ", nézd meg a szerepedet!";
}

function revealRole() {
  document.getElementById("roleDisplay").innerText = roles[currentPlayer];
  document.getElementById("roleDisplay").style.display = "block";
  document.getElementById("nextBtn").style.display = "inline-block";
}

function nextPlayer() {
  currentPlayer++;
  if (currentPlayer >= players.length) {
    document.getElementById("game").innerHTML = "<h2>Mindenki megnézte a szerepét. Jó játékot!</h2>";
  } else {
    showPlayer();
  }
}
