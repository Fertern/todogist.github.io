class Card {
  constructor(info) {
    this.id = info.id;
    this.title = info.title;
    this.description = info.description;
    this.priority = info.priority;
    this.isOpened = false;
  }
  saveInfo(allCards) {
    localStorage.setItem("globalStorage", JSON.stringify(allCards));
  }
  deleteInfo(allCards) {
    let listId = this.id;
    let index = allCards.findIndex(function(list) {
      return parseInt(list.id) === listId;
    });
    allCards.splice(index, 1);
    this.saveInfo(allCards);
  }
  checkCard(allCards) {
    this.isOpened = !this.isOpened;
    this.saveInfo(allCards);
  }
}
