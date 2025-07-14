let cards = [];
let current = 0;

async function loadCards() {
  const res = await fetch("cards.json");
  cards = await res.json();
  shuffle(cards);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showNextCard() {
  if (cards.length === 0 || current >= cards.length) {
    document.getElementById("card-title").innerText = "Game Over!";
    document.getElementById("card-desc").innerText = "Reload to start again.";
    document.getElementById("card-img").style.display = "none";
    return;
  }

  const card = cards[current++];
  document.getElementById("card-title").innerText = card.title;
  document.getElementById("card-desc").innerText = card.description;

  const img = document.getElementById("card-img");
  if (card.img_name) {
    img.src = `images/${card.img_name}.${card.img_file_type}`;
    img.style.display = "block";
  } else {
    img.style.display = "none";
  }
}

document.getElementById("next-btn").addEventListener("click", showNextCard);

window.onload = loadCards;
