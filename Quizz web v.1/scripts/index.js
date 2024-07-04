let highScore = 0; // Variable pour stocker le score le plus élevé

// Fonction pour vérifier si la réponse de l'utilisateur est correcte
const verifierReponse = (reponseUtilisateur, reponseAttendue) =>
  reponseUtilisateur === reponseAttendue;

// Fonction pour afficher le score final
const afficherResultat = (score, nbPropositions) => {
  document.getElementById(
    "resultat"
  ).innerText = `Votre score : ${score} / ${nbPropositions}`;
  if (score > highScore) {
    highScore = score; // Mettre à jour le score le plus élevé
    document.getElementById("highScore").innerText = `High Score: ${highScore}`; // Afficher le score le plus élevé
  }
};

// Fonction pour afficher la proposition actuelle à l'utilisateur
const afficherProposition = (proposition) => {
  document.querySelector("#zoneProposition span").innerText = proposition;
};

// Fonction pour gérer la validation de la réponse de l'utilisateur
const gererValidation = () => {
  const inputEcriture = document.getElementById("ZoneReponse");
  const reponseUtilisateur = inputEcriture.value.trim();
  const reponseAttendue = propositions[propositionsActuelIndex];

  if (reponseUtilisateur === "") return;

  if (verifierReponse(reponseUtilisateur, reponseAttendue)) score++;
  inputEcriture.value = "";
  playSound("up");

  propositionsActuelIndex++;
  if (propositionsActuelIndex >= propositions.length) {
    afficherProposition("Le jeu est fini");
    document.getElementById("BoutonValider").disabled = true;
    afficherResultat(score, nbPropositions);
    playSound("down");
    clearInterval(timer);
    document.getElementById("progressBar").style.display = "none";
  } else {
    afficherProposition(propositions[propositionsActuelIndex]);
    resetProgressBar();
  }
};

// Fonction pour changer les propositions selon le mode de jeu sélectionné
const changerPropositions = () => {
  propositions = mode === "mots" ? [...listeMots] : [...listePhrases];
  propositions = shuffleArray(propositions);
  propositionsActuelIndex = 0;
  score = 0;
  nbPropositions = propositions.length;
  document.getElementById("BoutonValider").disabled = false;
  afficherProposition(propositions[propositionsActuelIndex]);
  afficherResultat(score, nbPropositions);
  resetProgressBar();
};

// Fonction pour initialiser le jeu et configurer les événements
const lancerJeu = () => {
  document.getElementsByName("optionSource").forEach((option) => {
    option.addEventListener("change", (event) => (mode = event.target.value));
  });

  document
    .getElementById("BoutonValider")
    .addEventListener("click", gererValidation);
  document
    .getElementById("ZoneReponse")
    .addEventListener("keypress", (event) => {
      if (event.key === "Enter") gererValidation();
    });

  document.getElementById("BoutonPause").addEventListener("click", pauseTimer);
  document.getElementById("BoutonPlay").addEventListener("click", playTimer);
  document.getElementById("BoutonStart").addEventListener("click", startGame);

  document.getElementById("progressBar").style.display = "none";
};

// Fonction pour jouer un son en fonction du type d'événement
const playSound = (type) => {
  const audio = new Audio(type === "up" ? "start.wav" : "end.wav");
  audio.play();
};

// Fonction pour obtenir un index aléatoire dans le tableau des propositions
const getRandomIndex = () => Math.floor(Math.random() * propositions.length);

// Fonction pour démarrer la barre de progression
const startProgressBar = () => {
  const progressBar = document.getElementById("progress");
  let width = 0;
  timer = setInterval(() => {
    if (width >= 100) {
      clearInterval(timer);
      gererValidation();
    } else if (!isPaused) {
      width++;
      progressBar.style.width = width + "%";
    }
  }, 100);
};

// Fonction pour réinitialiser la barre de progression
const resetProgressBar = () => {
  clearInterval(timer);
  document.getElementById("progress").style.width = "0";
  startProgressBar();
};

// Fonction pour mettre le jeu en pause
const pauseTimer = () => {
  isPaused = true;
  document.getElementById("ZoneReponse").disabled = true;
  document.getElementById("BoutonValider").disabled = true;
};

// Fonction pour reprendre le jeu après une pause
const playTimer = () => {
  isPaused = false;
  document.getElementById("ZoneReponse").disabled = false;
  document.getElementById("BoutonValider").disabled = false;
};

// Fonction pour démarrer le jeu
const startGame = () => {
  isPaused = false;
  document.getElementById("ZoneReponse").disabled = false;
  document.getElementById("BoutonValider").disabled = false;
  document.getElementById("progressBar").style.display = "block";
  changerPropositions();
};

// Fonction pour mélanger les éléments d'un tableau
const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

lancerJeu();
