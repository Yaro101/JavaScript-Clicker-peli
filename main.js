let score = 0;
let clicks = 0;
let currentMultiplier = 1; // Alustetaan oletuskertoimella 1

let options = {
    2: { cost: 50, multiplier: 2, activated: false },
    3: { cost: 100, multiplier: 3, activated: false },
    4: { cost: 250, multiplier: 4, activated: false },
    5: { cost: 500, multiplier: 5, activated: false }
};

// Toiminto soittaa sword aääntä
function playSwordSound() {
    const audio = document.getElementById("click-sound");
    audio.currentTime = 0; // Kelaa ääni takaisin alkuun (jos se on jo soitettu).
    audio.play();
}

// Toiminto soittaa options aääntä
function playOptionSound() {
    const audio = document.getElementById("option-sound");
    audio.currentTime = 0; // Kelaa ääni takaisin alkuun (jos se on jo soitettu).
    audio.play();
}

// Toiminto pisteiden päivittämiseksi
function updateScore() {
    document.getElementById("score-count").innerHTML = score;
}

// Toiminto, jolla päivitetään klikkausten kokonaismäärä
function updateClicks() {
    document.getElementById("click-count").innerHTML = clicks;
}

// Toiminto optionäppäimen tilan päivittämiseksi
function updateOptionButtons() {
    for (const option in options) {
        const button = document.getElementById(option + "x-button");
        if (!options[option].activated && score >= options[option].cost) {
            button.removeAttribute("disabled");
            button.classList.add("highlighted");
        } else {
            button.setAttribute("disabled", "true");
            button.classList.remove("highlighted");
        }
    }
}

function clicked() {
    playSwordSound(); // Kutsu funktio soittaa Sword äänen
    clicks++;
    score += currentMultiplier; // Päivitä pisteet käyttämällä currentMultiplieriä
    updateScore();
    updateClicks();
    updateOptionButtons(); // Päivitä option painikkeet jokaisen napsautuksen jälkeen
}

function buyOption(option) {
    if (score >= options[option].cost && !options[option].activated) {
        score -= options[option].cost;
        options[option].activated = true;
        currentMultiplier = options[option].multiplier; // Päivittää currentMultiplier
        playOptionSound(); // Kutsu toimintoa, joka soittaa sword äänen
        updateScore();
        updateOptionButtons(); // Päivitä optiopainikkeet option ostamisen jälkeen
    }
}

// Alkuasetukset
updateScore();
updateClicks();
updateOptionButtons();
