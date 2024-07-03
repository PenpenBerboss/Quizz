// Logique du jeu
function verifierReponse(reponseUtilisateur, reponseAttendue) {
  return reponseUtilisateur === reponseAttendue;
}

function afficherResultat(score, nbPropositions) {
  const contenuResultat = "Votre score : " + score + " / " + nbPropositions;
  document.getElementById("resultat").innerText = contenuResultat;
}

// Interface utilisateur
function afficherProposition(proposition) {
  const baliseZonePropositionSpan = document.querySelector(
    "#zoneProposition span"
  );
  baliseZonePropositionSpan.innerText = proposition;
}

function gererValidation() {
  const inputEcriture = document.getElementById("ZoneReponse");
  const reponseUtilisateur = inputEcriture.value;
  const reponseAttendue = propositions[propositionsActuelIndex];

  if (verifierReponse(reponseUtilisateur, reponseAttendue)) {
    score++;
  }

  // propositionsActuelIndex++;
  inputEcriture.value = "";

  playSound("click"); // Jouer le son pour le clic

  if (propositionsActuelIndex >= propositions.length) {
    afficherProposition("Le jeu est fini");
    document.getElementById("BoutonValider").disabled = true;
    afficherResultat(score, nbPropositions);
    playSound("end"); // Jouer le son pour la fin du jeu
    clearInterval(timer);
  } else {
    afficherProposition(propositions[getRandomIndex()]);
    resetProgressBar();
  }
}

function changerPropositions(type) {
  propositions = type === "mots" ? listeMots : listePhrases;
  propositionsActuelIndex = 0;
  score = 0;
  nbPropositions = propositions.length;
  document.getElementById("BoutonValider").disabled = false;
  afficherProposition(propositions[getRandomIndex()]);
  afficherResultat(score, nbPropositions);
  resetProgressBar();
}

function lancerJeu() {
  const options = document.getElementsByName("optionSource");
  options.forEach(function (option) {
    option.addEventListener("change", (event) => {
      changerPropositions(event.target.value);
    });
  });

  document
    .getElementById("ZoneReponse")
    .addEventListener("input", (event) => {});

  document
    .getElementById("BoutonValider")
    .addEventListener("click", gererValidation);
  afficherProposition(propositions[propositionsActuelIndex]);

  document
    .getElementById("ZoneReponse")
    .addEventListener("keypress", function (event) {
      if (event.key === "Enter") {
        gererValidation();
      }
    });

  document.getElementById("BoutonPause").addEventListener("click", pauseTimer);
  document.getElementById("BoutonPlay").addEventListener("click", playTimer);
  document.getElementById("BoutonStart").addEventListener("click", startGame);

  changerPropositions("mots");
  document.getElementById("progressBar").style.display = "none"; // Masquer la barre de progression au début
}

function playSound(type) {
  let audio;
  if (type === "click") {
    audio = new Audio("click_sound.wav"); // Assurez-vous d'avoir ce fichier dans votre répertoire
  } else if (type === "end") {
    audio = new Audio("end_sound.wav"); // Assurez-vous d'avoir ce fichier dans votre répertoire
  }
  audio.play();
}

function getRandomIndex() {
  return Math.floor(Math.random() * propositions.length);
}

function startProgressBar() {
  var progressBar = document.getElementById("progress");
  var width = 0;
  timer = setInterval(function () {
    if (width >= 100) {
      clearInterval(timer);
      gererValidation(); // Valider automatiquement si le temps est écoulé
    } else {
      if (!isPaused) {
        width++;
        progressBar.style.width = width + "%";
      }
    }
  }, 100);
}

function resetProgressBar() {
  clearInterval(timer);
  var progressBar = document.getElementById("progress");
  progressBar.style.width = "0";
  startProgressBar();
}

function pauseTimer() {
  isPaused = true;
  document.getElementById("ZoneReponse").disabled = true;
  document.getElementById("BoutonValider").disabled = true;
}

function playTimer() {
  isPaused = false;
  document.getElementById("ZoneReponse").disabled = false;
  document.getElementById("BoutonValider").disabled = false;
}

function startGame() {
  document.getElementById("ZoneReponse").disabled = false;
  document.getElementById("progressBar").style.display = "block"; // Afficher la barre de progression
  changerPropositions("mots");
  resetProgressBar();
}

lancerJeu();
