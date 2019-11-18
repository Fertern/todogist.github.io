class Card {
  constructor(info) {
    this.id = info.id;
    this.title = info.title;
    this.description = info.description;
    this.priority = info.priority;
    this.isDone = info.isDone;
  }
}
export default Card;
