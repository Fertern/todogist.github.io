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
window.addEventListener("DOMContentLoaded", handlePageLoad);

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
  let htmlBlock = `<article identifier="${props.id}" id='${"f" + props.id}'
  ${props.isOpened ? 'class="card__wrapper open"' : "class='card__wrapper'"} >
  <div class='card__text'>
    <div id='${"card__title" + props.id}' class='card__title'>${
    props.title
  }</div>
    <input type="text" id="${"edited-title" +
      props.id}" class='edited-title hide'/>
    <div id='${"card__description" + props.id}' class='card__description'>${
    props.description
  }</div>
    <input type="text" 
    id="${"edited-description" + props.id}" class='edited-description hide'/>
  </div>
  <div class='card__down'>
    <span id='${"card__priority" + props.id}' class='card__priority'>${
    props.priority
  }</span>
    <div class="edit-select">
      <select id='${"edited-priority" +
        props.id}' class="edited-priority hide" >
        <option selected value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <span id='${"card__edit" + props.id}'  class='card__edit'>
      <div class='extra-img'>...</div>
      <div class='extra-menu'>
        <button class='extra-menu__edit'>edit</button>
        <button class='extra-menu__done'>done</button>
        <button class='extra-menu__delete'>delete</button> 
          </div>
    </span>
    <span id='${"ok" + props.id}' class='ok'>OK</span>
  </div>
</article>`;
  cardsArea.insertAdjacentHTML("afterbegin", htmlBlock);
  // --extra suka
  extraEdit = document.querySelector(".extra-menu__edit");
  extraDone = document.querySelector(".extra-menu__done");
  extraDelete = document.querySelector(".extra-menu__delete");
  // --Def suka
  // --
  extraEdit.addEventListener("click", editCard);
  extraDone.addEventListener("click", doneCard);
  extraDelete.addEventListener("click", deleteCard);
}

function editCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards),
    id = allCards[listIndex].id,
    // -- Card as usual
    idTitleDef = "#" + "card__title" + id,
    idDescriptionDef = "#" + "card__description" + id,
    idPriorityDef = "#" + "card__priority" + id,
    idDots = "#" + "card__edit" + id,
    // -- Card as editing
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
  // --
  ok.addEventListener("click", saveOk);
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
  // --
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
  let info = editCard(e);
  console.log(info[0].value);
  info[0].innerHTML = info[1].value;
  info[2].innerHTML = info[3].value;
  info[4].innerHTML = info[5].value;
  let itCard = allCards.find(item => item.id === info[6]);
  itCard.title = info[1].value;
  itCard.description = info[3].value;
  itCard.priority = info[5].value;
  console.log(allCards);
  allCards[info[7]].saveInfo(allCards);
}

function doneCard(e) {
  let listIndex = findIndex(retrieveId(e, "article"), allCards),
    itId = "#" + "f" + allCards[listIndex].id,
    itCard = document.querySelector(itId),
    itCardInArray = allCards.find(item => item.id === allCards[listIndex].id);
  itCard.classList.toggle("open");

  //allCards[listIndex].isOpened = true;
  //done/undone ->
  if (itCardInArray.isOpened) {
    itCardInArray.isOpened = false;
  } else {
    itCardInArray.isOpened = true;
  }
  //console.log(localStorage.getItem("globalStorage"));
  allCards[listIndex].saveInfo(allCards);
  //console.log(localStorage.getItem("globalStorage"));
}

function addCard() {
  let newCard = new Card({
    id: allCards.length,
    title: inputTitle.value,
    description: inputDescription.value,
    priority: inputPriority.value
  });
  //console.log(inputTitle.value);
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
    console.log(JSON.parse(localStorage.getItem("globalStorage")));
    console.log(allCards);
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
