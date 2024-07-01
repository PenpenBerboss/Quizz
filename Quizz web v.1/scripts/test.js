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

  propositionsActuelIndex++;
  inputEcriture.value = "";

  playSound("click"); // Jouer le son pour le clic

  if (propositionsActuelIndex >= propositions.length) {
    afficherProposition("Le jeu est fini");
    document.getElementById("BoutonValider").disabled = true;
    afficherResultat(score, nbPropositions);
    playSound("end"); // Jouer le son pour la fin du jeu
  } else {
    afficherProposition(propositions[propositionsActuelIndex]);
  }
}

function changerPropositions(type) {
  propositions = type === "mots" ? listeMots : listePhrases;
  propositionsActuelIndex = 0;
  score = 0;
  nbPropositions = propositions.length;
  document.getElementById("BoutonValider").disabled = false;
  afficherProposition(propositions[propositionsActuelIndex]);
  afficherResultat(score, nbPropositions);
}

function lancerJeu() {
  const options = document.getElementsByName("optionSource");
  options.forEach((option) => {
    option.addEventListener("change", (event) => {
      changerPropositions(event.target.value);
    });
  });

  document.getElementById("ZoneReponse").addEventListener("input", (event) => {
    afficherProposition(propositions[propositionsActuelIndex]);
  });

  document
    .getElementById("BoutonValider")
    .addEventListener("click", gererValidation);

  changerPropositions("mots");
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

lancerJeu();
