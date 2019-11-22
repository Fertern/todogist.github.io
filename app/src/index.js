import { cardMethods } from "./cardCreator";
import search from "./searcher";
import "./css/index.less";
// Global elements and func for export
export const inputTitle = document.querySelector("#input-title"),
  inputDescription = document.querySelector("#input-description"),
  inputPriority = document.querySelector("#input-priority"),
  cardsArea = document.getElementById("cards-area"),
  editMenu = document.getElementById("edit-menu"),
  menu = document.getElementById("menu"),
  searchTitle = document.getElementById("search-title"),
  inputSearch = document.querySelector(".search-title__bar"),
  searchStatus = document.getElementById("search-status"),
  searchPriority = document.getElementById("search-priority"),
  toggleEditMenu = function() {
    inputTitle.setAttribute("placeholder", "Your title..");
    inputTitle.classList.remove("alert");
    editMenu.classList.toggle("hidden");
  };

// Global events
editMenu.addEventListener("click", editMenuButtons);
menu.addEventListener("click", menuButtons);
searchTitle.addEventListener("input", search);
searchStatus.addEventListener("change", search);
searchPriority.addEventListener("change", search);

// For events
function editMenuButtons(e) {
  e.preventDefault();
  if (e.target.id === "button-save") {
    cardMethods.addCard(e);
  } else if (e.target.id === "button-cancel") {
    toggleEditMenu();
  } else if (e.target.id === "input-title") {
    inputTitle.setAttribute("placeholder", "Your title..");
    inputTitle.classList.remove("alert");
  }
}

function menuButtons(e) {
  e.preventDefault();
  if (e.target.id === "button-create") {
    toggleEditMenu();
  }
}

// End. Thanks for review :3
