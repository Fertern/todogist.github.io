import {
  toggleEditMenu,
  inputTitle,
  inputDescription,
  inputPriority
} from "./index";
import Card from "./card";
import renderCards from "./renderer";
import finder from "./finder";

//Array for cards
let allCards = [],
  //Interactions with cards
  cardMethods = {
    addCard() {
      if (!inputTitle.value) {
        inputTitle.setAttribute("placeholder", "Card must have a title!");
        inputTitle.classList.add("alert");
      } else {
        let newCard = new Card({
          id: `_f${(~~(Math.random() * 1e5)).toString()}`,
          title: inputTitle.value,
          description: inputDescription.value,
          priority: inputPriority.value,
          isDone: false
        });
        allCards.push(newCard);
        renderCards(newCard);
        inputTitle.value = "";
        inputDescription.value = "";
        inputTitle.classList.remove("alert");
        toggleEditMenu();
      }
    },
    doneCard(e) {
      let listIndex = finder.findIndex(
        finder.retrieveId(e, "article"),
        allCards
      );
      // Set unique ID for card
      let itId = "#" + allCards[listIndex].id,
        itCard = document.querySelector(itId),
        itCardInArray = allCards.find(
          item => item.id === allCards[listIndex].id
        );
      itCard.classList.toggle("done");
      if (itCardInArray.isDone) {
        itCardInArray.isDone = false;
      } else {
        itCardInArray.isDone = true;
      }
    },
    deleteCard(e) {
      e.target.closest("article").remove();
    }
  };

// Editing methods for card
function editCard(e) {
  let listIndex = finder.findIndex(finder.retrieveId(e, "article"), allCards),
    id = allCards[listIndex].id,
    // Set unique ID for every single card
    idTitleDef = "#" + "card__title" + id,
    idDescriptionDef = "#" + "card__description" + id,
    idPriorityDef = "#" + "card__priority" + id,
    idDots = "#" + "card__edit" + id,
    // --
    idTitle = "#" + "edited-title" + id,
    idDescription = "#" + "edited-description" + id,
    idPriority = "#" + "edited-priority" + id,
    idOk = "#" + "ok" + id,
    // --
    editedTitle = document.querySelector(idTitle),
    editedDescription = document.querySelector(idDescription),
    editedPriority = document.querySelector(idPriority),
    // --
    defTitle = document.querySelector(idTitleDef),
    defDescription = document.querySelector(idDescriptionDef),
    defPriority = document.querySelector(idPriorityDef),
    // --
    dots = document.querySelector(idDots),
    ok = document.querySelector(idOk);
  // Swap between 'default' and 'editing'
  editedTitle.classList.toggle("hide");
  editedDescription.classList.toggle("hide");
  editedPriority.classList.toggle("hide");
  // --
  defTitle.classList.toggle("hide");
  defDescription.classList.toggle("hide");
  defPriority.classList.toggle("hide");
  // --
  dots.classList.toggle("hide");
  ok.classList.toggle("hide");
  // Export variables for using in another function
  return {
    defTitle,
    editedTitle,
    defDescription,
    editedDescription,
    defPriority,
    editedPriority,
    id,
    listIndex,
    ok,
    dots
  };
}
function saveOk(e) {
  // Use array of variables from last function
  let info = editCard(e);
  if (info.editedTitle.value == "") {
    info.editedTitle.value = "Untitled task";
  }
  info.defTitle.innerHTML = info.editedTitle.value;
  info.defDescription.innerHTML = info.editedDescription.value;
  info.defPriority.innerHTML = info.editedPriority.value;
  let itCard = allCards.find(item => item.id === info.id);
  // ATTENTION
  itCard.title = info.editedTitle.value;
  itCard.description = info.editedDescription.value;
  itCard.priority = info.editedPriority.value;
}

export { cardMethods, editCard, saveOk };
