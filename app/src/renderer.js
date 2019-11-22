import { cardsArea } from "./index";
import { cardMethods, editCard, saveOk } from "./cardCreator";
function renderCards(props) {
  let htmlBlock = `<article id='${props.id}'
  ${props.isDone ? 'class="card__wrapper done"' : "class='card__wrapper'"} >
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
    <span id='${"card__priority" + props.id}' class='card__priority'>${
    props.priority
  }</span>
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
  let extraEdit = document.querySelector(".extra-menu__edit"),
    extraDone = document.querySelector(".extra-menu__done"),
    extraDelete = document.querySelector(".extra-menu__delete"),
    ok = document.querySelector(".ok");
  // Events for extra-menu
  extraDone.addEventListener("click", cardMethods.doneCard);
  extraDelete.addEventListener("click", cardMethods.deleteCard);
  extraEdit.addEventListener("click", editCard);
  ok.addEventListener("click", saveOk);
}

export default renderCards;
