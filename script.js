let currentDirection = 'en-pl';
let currentWord = null;
let isFlipped = false;

const flashcard = document.getElementById('flashcard');
const wordElement = document.getElementById('word');
const translationElement = document.getElementById('translation');
const nextButton = document.getElementById('nextButton');
const directionToggle = document.getElementById('directionToggle');

function getRandomWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  return words[randomIndex];
}

function showNewWord() {
  if (isFlipped) {
    translationElement.classList.remove('show');
    isFlipped = false;

    setTimeout(() => {
      updateWordContent();
    }, 400);
  } else {
    updateWordContent();
  }
}

function updateWordContent() {
  currentWord = getRandomWord();

  if (currentDirection === 'en-pl') {
    wordElement.textContent = currentWord.en;
    translationElement.textContent = currentWord.pl;
  } else {
    wordElement.textContent = currentWord.pl;
    translationElement.textContent = currentWord.en;
  }
}

function toggleTranslation() {
  if (!currentWord) return;

  isFlipped = !isFlipped;
  if (isFlipped) {
    translationElement.classList.add('show');
  } else {
    translationElement.classList.remove('show');
  }
}

function toggleDirection() {
  currentDirection = currentDirection === 'en-pl' ? 'pl-en' : 'en-pl';

  if (currentDirection === 'en-pl') {
    directionToggle.textContent = '🇬🇧 → 🇵🇱';
  } else {
    directionToggle.textContent = '🇵🇱 → 🇬🇧';
  }

  if (currentWord) {
    showNewWord();
  }
}

flashcard.addEventListener('click', toggleTranslation);
nextButton.addEventListener('click', showNewWord);
directionToggle.addEventListener('click', toggleDirection);

document.addEventListener('keydown', (e) => {
  if (e.key === ' ' || e.key === 'Enter') {
    e.preventDefault();
    toggleTranslation();
  } else if (e.key === 'ArrowRight' || e.key === 'n' || e.key === 'N') {
    e.preventDefault();
    showNewWord();
  } else if (e.key === 'd' || e.key === 'D') {
    e.preventDefault();
    toggleDirection();
  }
});
