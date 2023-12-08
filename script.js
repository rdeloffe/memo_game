document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('gameBoard');
    let cards = ['1', '2', '3', '4', '5', '6', '7', '8'];
    cards = [...cards, ...cards]; // Dupliquez les cartes pour avoir des paires
  
    // Mélangez les cartes
    cards.sort(() => 0.5 - Math.random());
  
    // Créez les cartes et ajoutez-les au plateau de jeu
    cards.forEach(card => {
      const cardElement = document.createElement('div');
      cardElement.classList.add('card');
      cardElement.dataset.image = card;
      cardElement.innerHTML = `<img src="images/${card}.png" alt="Image ${card}">`;
      gameBoard.appendChild(cardElement);
    });
  
    // Logique du jeu
    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
  
    function flipCard() {
      if (lockBoard) return;
      if (this === firstCard) return;
  
      this.classList.add('flipped');
  
      if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
      }
  
      secondCard = this;
      checkForMatch();
    }
  
    function checkForMatch() {
      let isMatch = firstCard.dataset.image === secondCard.dataset.image;
      isMatch ? disableCards() : unflipCards();
    }
  
    let score = 0;
let pairsFound = 0;

function updateScore() {
  score++;
  document.getElementById('score').innerText = 'Score: ' + score;
}

function checkForWin() {
  if (pairsFound === 8) {
    document.getElementById('winMessage').style.display = 'block';
  }
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  pairsFound++;
  updateScore();
  checkForWin();
  resetBoard();
}
  
    function unflipCards() {
      lockBoard = true;
      setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
      }, 1500);
    }
  
    function resetBoard() {
      [hasFlippedCard, lockBoard, firstCard, secondCard] = [false, false, null, null];
    }
  
    const allCards = document.querySelectorAll('.card');
    allCards.forEach(card => card.addEventListener('click', flipCard));
  });
  