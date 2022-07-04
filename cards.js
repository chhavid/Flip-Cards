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
    const card = this.#cards[cardId];
    this.#selected.push(card);
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

  isAlreadySelected(newId) {
    return this.#selected.find((card) => {
      const { id } = card.getInfo();
      return id === +newId;
    });
  }
}

class Card {
  #id;
  #symbol;
  constructor(id, symbol) {
    this.#id = id;
    this.#symbol = symbol;
  }

  isSame(anotherCard) {
    const { symbol } = anotherCard.getInfo();
    return symbol === this.#symbol;
  }

  remove() {
    this.#symbol = '';
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
  }, 200);
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
      if (cards.isAlreadySelected(block.id) || cards.isPair()) {
        return;
      }
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
  const symbols = 'XORAXPAOPREE'.split('');
  const cards = symbols.map((symbol, id) => new Card(id, symbol));
  return new Cards(...cards);
};

const main = () => {
  window.onload = () => {
    const cards = createCards(6);
    generateHtml(cards);
    const blocks = document.getElementsByClassName('block');
    clickEvent(blocks, cards);
  };
};

main();
