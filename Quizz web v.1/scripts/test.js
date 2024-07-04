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
  // document.getElementById("BoutonStart").disabled = true;
  const inputEcriture = document.getElementById("ZoneReponse");
  const reponseUtilisateur = inputEcriture.value;
  const reponseAttendue = propositions[propositionsActuelIndex];

  if (verifierReponse(reponseUtilisateur, reponseAttendue)) {
    score++;
  }

  inputEcriture.value = "";

  playSound("click"); // Jouer le son pour le clic

  propositionsActuelIndex++;
  if (propositionsActuelIndex >= propositions.length) {
    afficherProposition("Le jeu est fini");
    document.getElementById("BoutonValider").disabled = true;
    afficherResultat(score, nbPropositions);
    playSound("end"); // Jouer le son pour la fin du jeu
    clearInterval(timer);
    document.getElementById("progressBar").style.display = "none"; // Masquer la barre de progression
  } else {
    afficherProposition(propositions[propositionsActuelIndex]);
    resetProgressBar();
  }
}

function changerPropositions() {
  propositions = mode === "mots" ? [...listeMots] : [...listePhrases];
  propositions = shuffleArray(propositions);
  propositionsActuelIndex = 0;
  score = 0;
  nbPropositions = propositions.length;
  document.getElementById("BoutonValider").disabled = false;
  afficherProposition(propositions[propositionsActuelIndex]);
  afficherResultat(score, nbPropositions);
  resetProgressBar();
}

function lancerJeu() {
  const options = document.getElementsByName("optionSource");
  options.forEach(function (option) {
    option.addEventListener("change", (event) => {
      mode = event.target.value;
    });
  });

  document
    .getElementById("BoutonValider")
    .addEventListener("click", gererValidation);

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
  document.getElementById("BoutonValider").disabled = false;
  document.getElementById("progressBar").style.display = "block"; // Afficher la barre de progression
  changerPropositions();
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

lancerJeu();
