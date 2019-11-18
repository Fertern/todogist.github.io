class Card {
  constructor(info) {
    this.id = info.id;
    this.title = info.title;
    this.description = info.description;
    this.priority = info.priority;
    this.isDone = info.isDone;
  }
  saveInfo(array) {
    localStorage.setItem("globalStorage", JSON.stringify(array));
  }
  deleteInfo(array) {
    let listId = this.id;
    let index = array.findIndex(function(list) {
      return parseInt(list.id) === listId;
    });
    array.splice(index, 1);
    this.saveInfo(array);
  }
}
export default Card;
