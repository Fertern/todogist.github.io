import {
  toggleEditMenu,
  inputTitle,
  inputDescription,
  inputPriority
} from "./index";
import Card from "./card";
import renderCards from "./renderer";
import finder from "./finder";
import searchAll from "./searcher";
import handlePageLoad from "./restorer";

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
          id: `f${(~~(Math.random() * 1e5)).toString()}`,
          title: inputTitle.value,
          description: inputDescription.value,
          priority: inputPriority.value,
          isDone: false
        });
        allCards.push(newCard);
        renderCards(newCard);
        newCard.saveInfo(allCards);
        inputTitle.value = "";
        inputDescription.value = "";
        inputTitle.classList.remove("alert");
        toggleEditMenu();
      }
    },

    editCard(e) {
      let listIndex = finder.findIndex(
          finder.retrieveId(e, "article"),
          allCards
        ),
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
      ok.addEventListener("click", saveOk);
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
      let arr = [
        defTitle,
        editedTitle,
        defDescription,
        editedDescription,
        defPriority,
        editedPriority,
        id,
        listIndex
      ];
      return arr;
    },
    saveOk(e) {
      // Use array of variables from last function
      let info = editCard(e);
      info[0].innerHTML = info[1].value;
      info[2].innerHTML = info[3].value;
      info[4].innerHTML = info[5].value;
      let itCard = allCards.find(item => item.id === info[6]);
      itCard.title = info[1].value;
      itCard.description = info[3].value;
      itCard.priority = info[5].value;
      allCards[info[7]].saveInfo(allCards); // save changes into localStorage
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
      itCard.classList.toggle("open");
      if (itCardInArray.isDone) {
        itCardInArray.isDone = false;
      } else {
        itCardInArray.isDone = true;
      }
      allCards[listIndex].saveInfo(allCards); // save into localStorage
    },

    deleteCard(e) {
      let listIndex = finder.findIndex(
        finder.retrieveId(e, "article"),
        allCards
      );
      allCards[listIndex].deleteInfo(allCards);
      e.target.closest("article").remove();
    }
  },
  //Currying with 'allCards'
  manager = {
    handlePageLoad() {
      handlePageLoad(allCards);
    },
    searchAll() {
      searchAll(allCards);
    }
  };
export { cardMethods, manager };
