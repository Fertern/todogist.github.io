// Global elements
let inputTitle = document.querySelector("#input-title"),
  inputDescription = document.querySelector("#input-description"),
  inputPriority = document.querySelector("#input-priority"),
  cardsArea = document.getElementById("cards-area"),
  editMenu = document.getElementById("edit-menu"),
  menu = document.getElementById("menu"),
  searchTitle = document.getElementById("search-title"),
  inputSearch = document.querySelector(".search-title__bar"),
  searchStatus = document.getElementById("search-status"),
  searchPriority = document.getElementById("search-priority");

// Array for all cards
let allCards = [];

// Global events
editMenu.addEventListener("click", editMenuButtons);
menu.addEventListener("click", menuButtons);
window.addEventListener("DOMContentLoaded", handlePageLoad);
searchTitle.addEventListener("input", searchAll);
searchStatus.addEventListener("change", searchAll);
searchPriority.addEventListener("change", searchAll);

/* Functions */

// For events
function editMenuButtons(e) {
  e.preventDefault();
  if (e.target.id === "button-save") {
    addCard(e);
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

function toggleEditMenu() {
  inputTitle.setAttribute("placeholder", "Your title..");
  inputTitle.classList.remove("alert");
  editMenu.classList.toggle("hidden");
}

// For search current card in array
function retrieveId(e, location) {
  var taskId = e.target.closest(location).getAttribute("id");
  return taskId;
}
function findIndex(taskId, globalArray) {
  return globalArray.findIndex(item => item.id === taskId);
}

// For search cards
function searchAll() {
  let searchCards,
    status = searchStatus.value,
    priority = searchPriority.value,
    priorityCards,
    statusCards;
  if (status === "All" && priority === "All") {
    searchCards = allCards.filter(item =>
      item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  } else if (status === "All" && priority !== "All") {
    priorityCards = allCards.filter(item => item.priority === priority);
    searchCards = priorityCards.filter(item =>
      item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  } else if (status === "open" && priority !== "All") {
    statusCards = allCards.filter(item => item.isDone === false);
    priorityCards = statusCards.filter(item => item.priority === priority);
    searchCards = priorityCards.filter(item =>
      item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  } else if (status === "done" && priority !== "All") {
    statusCards = allCards.filter(item => item.isDone === true);
    priorityCards = statusCards.filter(item => item.priority === priority);
    searchCards = priorityCards.filter(item =>
      item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  } else {
    if (status === "open") {
      statusCards = allCards.filter(item => item.isDone === false);
    } else {
      statusCards = allCards.filter(item => item.isDone === true);
    }
    searchCards = statusCards.filter(item =>
      item.title.toLowerCase().includes(inputSearch.value.toLowerCase())
    );
  }
  cardsArea.innerHTML = "";
  for (let i = 0; i < searchCards.length; i++) {
    renderCards(searchCards[i]);
  }
}

// For display cards in DOM
function renderCards(props) {
  let htmlBlock = `<article id='${props.id}'
  ${props.isDone ? 'class="card__wrapper open"' : "class='card__wrapper'"} >
  <div class='card__text'>
    <div id='${"card__title" + props.id}' class='card__title'>
    ${props.title}</div>
    <input value='${props.title}' maxlength="30"
    id="${"edited-title" + props.id}" class='edited-title hide'/>
    <div id='${"card__description" + props.id}' class='card__description'>
    ${props.description}</div>
    <textarea value='${
      props.description
    }' maxlength="150" id="${"edited-description" +
    props.id}" class='edited-description hide'>${props.description}</textarea>
  </div>
  <div class='card__down'>
    <span id='${"card__priority" + props.id}' class='card__priority'>
    ${props.priority}</span>
    <div class="edit-select select">
      <select id='${"edited-priority" + props.id}'
        class="edited-priority hide" >
        <option selected value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <span id='${"card__edit" + props.id}'  class='card__edit'>
      <div class='extra-img'>...</div>
      <div class='extra-menu'>
        <button class='extra-menu__done'>Done</button>
        <button class='extra-menu__edit'>Edit</button>
        <button class='extra-menu__delete'>Delete</button>
          </div>
    </span>
    <span id='${"ok" + props.id}' class='ok'>OK</span>
  </div>
</article>`;
  cardsArea.insertAdjacentHTML("afterbegin", htmlBlock);
  // Elements of extra-menu
  extraEdit = document.querySelector(".extra-menu__edit");
  extraDone = document.querySelector(".extra-menu__done");
  extraDelete = document.querySelector(".extra-menu__delete");
  // Events for extra-menu
  extraEdit.addEventListener("click", editCard);
  extraDone.addEventListener("click", doneCard);
  extraDelete.addEventListener("click", deleteCard);
}

/* Interactions with cards */
function addCard() {
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
}

function editCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards),
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
}

function saveOk(e) {
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
}

function doneCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards);
  // Set unique ID for card
  let itId = "#" + allCards[listIndex].id,
    itCard = document.querySelector(itId),
    itCardInArray = allCards.find(item => item.id === allCards[listIndex].id);
  itCard.classList.toggle("open");
  if (itCardInArray.isDone) {
    itCardInArray.isDone = false;
  } else {
    itCardInArray.isDone = true;
  }
  allCards[listIndex].saveInfo(allCards); // save into localStorage
}

function deleteCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards);
  console.log(allCards[listIndex]);
  allCards[listIndex].deleteInfo(allCards);
  e.target.closest("article").remove();
}

// Functions for using localStorage
function handlePageLoad() {
  if (JSON.parse(localStorage.getItem("globalStorage"))) {
    restoreData();
    restoreDOM();
  }
}

function restoreData() {
  let recoveredData = JSON.parse(localStorage.getItem("globalStorage")).map(
    function(info) {
      return new Card({
        id: info.id,
        title: info.title,
        description: info.description,
        priority: info.priority,
        isDone: info.isDone
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
// End. Thanks for review :3
