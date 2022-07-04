class Cards {
  #cards;
  #selected;
  constructor(...cards) {
    this.#cards = cards;
    this.#selected = [];
  }

  areSame() {
    return this.#selected[0].isSame(this.#selected[1]);
  }

  isPair() {
    return this.#selected.length === 2;
  }

  select(cardId) {
    console.log(this.#cards[cardId]);
    const card = this.#cards[cardId];
    this.#selected.push(card);
    card.flip();
  }

  resetSelected() {
    this.#selected = [];
  }

  removeCards() {
    this.#selected.forEach((card) => {
      card.remove();
    });
  }

  numberOfCards() {
    return this.#cards.length;
  }

  getSelectedCards() {
    return this.#selected;
  }
}

class Card {
  #id;
  #symbol;
  constructor(id, symbol) {
    this.#id = id;
    this.#symbol = symbol;
    this.#content = '';
    this.#isFlipped = false;
  }

  isSame(anotherCard) {
    const { symbol } = anotherCard.getInfo();
    return symbol === this.#symbol;
  }

  flip() {
    this.#content = this.#symbol;
    this.#isFlipped = true;
  }

  remove() {
    this.#symbol = '';
    this.#content = '';
  }

  getInfo() {
    return {
      symbol: this.#symbol,
      id: this.#id
    };
  }
}

const remove = (card) => {
  card.style.background = 'white';
  card.innerText = '';
};

const removeCards = (cards, blocks) => {
  cards.getSelectedCards().forEach(card => {
    const { id } = card.getInfo();
    card.remove();
    remove(blocks[id]);
  });
};

const hide = (card) => {
  card.innerText = '';
};

const hideCards = (cards, blocks) => {
  cards.getSelectedCards().forEach(card => {
    const { id } = card.getInfo();
    hide(blocks[id]);
  });
};

const validateCardPair = (cards, blocks) => {
  setTimeout(() => {
    cards.areSame() ? removeCards(cards, blocks) : hideCards(cards, blocks);
    cards.resetSelected();
  }, 400);
};

const updateHtml = (blocks, cards) => {
  cards.getSelectedCards().forEach((card) => {
    const { id, symbol } = card.getInfo();
    blocks[id].innerText = symbol;
  })
};

const clickEvent = (blocks, cards) => {
  for (const block of blocks) {
    block.addEventListener('click', () => {
      cards.select(block.id);
      updateHtml(blocks, cards);
      if (cards.isPair()) {
        validateCardPair(cards, blocks);
      }
    });
  }
};

const addChild = (container, index) => {
  const block = document.createElement('div');
  block.className = 'block';
  block.id = index;
  container.appendChild(block);
};

const generateHtml = (cards) => {
  const container = document.getElementById('container');
  const totalCards = cards.numberOfCards();
  for (let index = 0; index < totalCards; index++) {
    addChild(container, index);
  }
};

const createCards = () => {
  const card1 = new Card(0, 'X');
  const card2 = new Card(1, 'O');
  const card3 = new Card(2, 'O');
  const card4 = new Card(3, 'X');
  return new Cards(card1, card2, card3, card4);
};

const main = () => {
  window.onload = () => {
    const cards = createCards();
    generateHtml(cards);
    const blocks = document.getElementsByClassName('block');
    clickEvent(blocks, cards);
  };
};

main();
