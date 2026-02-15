2
/* ======================================================
   PLAYER STATE MANAGEMENT
====================================================== */

let player = {
    level: 1,
    xp: 0,
    points: 0
};

/* ======================================================
   MISSION SYSTEM
   Tipos:
   - mandatory (obrigatórias)
   - optional (opcionais)
   - self (autosugeridas)
   - punishment (punição)
====================================================== */

let missions = [
    { id: 1, title: "Treinar 30 minutos", xp: 40, type: "mandatory" },
    { id: 2, title: "Ler 10 páginas", xp: 30, type: "optional" },
    { id: 3, title: "Criar nova meta", xp: 20, type: "self" },
    { id: 4, title: "Não cumprir meta", xp: -25, type: "punishment" }
];

/* ======================================================
   RANK SYSTEM (E -> S)
====================================================== */

function getRank(level) {
    if (level >= 30) return "S";
    if (level >= 20) return "A";
    if (level >= 15) return "B";
    if (level >= 10) return "C";
    if (level >= 5) return "D";
    return "E";
}

/* ======================================================
   COMPLETE MISSION LOGIC
====================================================== */

function completeMission(id) {
    let mission = missions.find(m => m.id === id);
    if (!mission) return;

    player.xp += mission.xp;

    if (player.xp < 0) player.xp = 0; // evita XP negativo

    checkLevelUp();
    saveProgress();
    updateUI();
}

/* ======================================================
   LEVEL UP SYSTEM
====================================================== */

function checkLevelUp() {
    let xpNeeded = player.level * 100;

    while (player.xp >= xpNeeded) {
        player.xp -= xpNeeded;
        player.level++;
        player.points += 10;
        showLevelUp();
        xpNeeded = player.level * 100;
    }
}

/* ======================================================
   UI RENDERING
====================================================== */

function updateUI() {
    document.getElementById("level").innerText = player.level;
    document.getElementById("rank").innerText = "Rank " + getRank(player.level);

    let xpNeeded = player.level * 100;
    document.getElementById("xpInfo").innerText = player.xp + " / " + xpNeeded + " XP";
    document.getElementById("points").innerText = player.points;
    document.getElementById("progress").style.width = (player.xp / xpNeeded) * 100 + "%";

    renderMissions();
}

function renderMissions() {
    let container = document.getElementById("missionList");
    container.innerHTML = "";

    missions.forEach(m => {
        let div = document.createElement("div");
        div.className = "mission";

        div.innerHTML = `
            <strong>[${m.type.toUpperCase()}]</strong> ${m.title} 
            <br>XP: ${m.xp}
            <br><button onclick="completeMission(${m.id})">Complete</button>
        `;

        container.appendChild(div);
    });
}

/* ======================================================
   LEVEL UP VISUAL EFFECT
====================================================== */

function showLevelUp() {
    let text = document.createElement("div");
    text.className = "level-up";
    text.innerText = "LEVEL UP";
    document.body.appendChild(text);

    setTimeout(() => text.remove(), 2000);
}

/* ======================================================
   LOCAL STORAGE (TEMPORARY FRONTEND STORAGE)
   Futuramente substituir por backend.
====================================================== */

function saveProgress() {
    localStorage.setItem("soloPlayer", JSON.stringify(player));
}

function loadProgress() {
    let saved = localStorage.getItem("soloPlayer");
    if (saved) player = JSON.parse(saved);
}

/* ======================================================
   FUTURE BACKEND INTEGRATION (COMMENTED)
====================================================== */

/*
// Exemplo futuro de consulta ao backend
async function fetchMissions() {
    const response = await fetch("http://localhost:5000/api/missions");
    const data = await response.json();
    missions = data;
    updateUI();
}

// Exemplo futuro de salvar progresso no backend
async function syncPlayer() {
    await fetch("http://localhost:5000/api/player", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(player)
    });
}
*/

/* ======================================================
   INITIALIZATION
====================================================== */


loadProgress();
updateUI();
