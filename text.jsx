<article identifier="${props.id}" id='${"f" + props.id}'
  ${props.isOpened ? 'class="card__wrapper open"' : "class='card__wrapper'"} >
  <div class='card__text'>
    <div class='card__title'>${props.title}</div>
    <input type="text" id="${'edited-title' + props.id}" class='edited-title'/>
    <div class='card__description'>${props.description}</div>
    <input type="text" id="${edited-description + props.id}" class='edited-description'/>
  </div>
  <div class='card__down'>
    <span class='card__priority'>${props.priority}</span>
    <div class="edit-select">
      <select id='${"edited-priority" + props.id}' class="edited-priority" >
        <option selected value="High">High</option>
        <option value="Normal">Normal</option>
        <option value="Low">Low</option>
      </select>
    </div>
    <span class='card__edit'>
      <div class='extra-img'>...</div>
      <div class='extra-menu'>
        <button class='extra-menu__edit'>edit</button>
        <button class='extra-menu__done'>done</button>
        <button class='extra-menu__delete'>delete</button> 
          </div>
    </span>
  </div>
</article>

