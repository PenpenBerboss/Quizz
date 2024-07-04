// Liste des mots utilisés pour le jeu
const listePhrases = [
  "Pas de panique !",
  "La vie, l'univers et le reste",
  "Merci pour le poisson",
  "Bonjour, comment allez-vous ?",
  "Salut, ça va ?",
  "Coucou, ça va ?",
];

const listeMots = ["Cachalot", "Pétunia", "Serviette", "Salut", "Coucou"];

let propositions = [];
let propositionsActuelIndex = 0;
let score = 0;
let nbPropositions = 0;
let mode = "mots";
let timer;
let isPaused = false;
