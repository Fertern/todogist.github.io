let inputTitle = document.querySelector("#input-title"),
  inputDescription = document.querySelector("#input-description"),
  inputPriority = document.querySelector("#input-priority"),
  cardsArea = document.getElementById("cards-area"),
  editMenu = document.getElementById("edit-menu"),
  menu = document.getElementById("menu");
//context = document.querySelector(".card__edit");
let allCards = [];

editMenu.addEventListener("click", editMenuButtons);
menu.addEventListener("click", menuButtons);

function editMenuButtons(e) {
  e.preventDefault();
  if (e.target.id === "button-save") {
    addCard(e);
    toggleEditMenu();
  } else if (e.target.id === "button-cancel") {
    toggleEditMenu();
  }
}

function menuButtons(e) {
  e.preventDefault();
  if (e.target.id === "button-create") {
    toggleEditMenu();
  }
}

// simple shit

function toggleEditMenu() {
  editMenu.classList.toggle("hidden");
}

//
function renderCards(props) {
  //console.log(props);
  let htmlBlock = `<article identifier="${props.id}"
  ${props.isOpened ? 'class="card__wrapper open"' : "class='card__wrapper'"} >
  <div class='card__text'>
    <div class='card__title'>${props.title}</div>
    <div class='card__description'>${props.description}</div>
  </div>
  <div class='card__down'>
    <span class='card__priority'>${props.priority}</span>
    <span class='card__edit'>...</span>
  </div>
</article>`;
  cardsArea.insertAdjacentHTML("afterbegin", htmlBlock);
  context = document.querySelector(".card__edit");
  context.addEventListener("click", deleteCard);
}

function addCard() {
  let newCard = new Card({
    id: allCards.length,
    title: inputTitle.value,
    description: inputDescription.value,
    priority: inputPriority.value
  });
  console.log(inputTitle.value);
  allCards.push(newCard);
  renderCards(newCard);
  newCard.saveInfo(allCards);
  inputTitle.value = "";
  inputDescription.value = "";
}

// FUNCTIONS
function handlePageLoad() {
  if (JSON.parse(localStorage.getItem("globalStorage"))) {
    restoreData();
    restoreDOM();
  }
}

function restoreData() {
  let recoveredData = JSON.parse(localStorage.getItem("globalStorage")).map(
    function(info) {
      return new ToDoList({
        id: info.id,
        title: info.title,
        description: info.description,
        priority: info.priority,
        isOpened: info.isOpened
      });
    }
  );
  allCards = recoveredData;
}
function restoreDOM() {
  for (let i = 0; i < allCards.length; i++) {
    renderCards(allCards[i]);
  }
}
// -----
function deleteCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards);

  allCards[listIndex].deleteInfo(allCards);
  e.target.closest("article").remove();
}
//-------

function retrieveId(e, location) {
  var taskId = e.target.closest(location).getAttribute("identifier");
  return taskId;
}

function findIndex(taskId, globalArray) {
  return globalArray.findIndex(function(task) {
    return task.id === parseInt(taskId);
  });
}
