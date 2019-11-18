!function(e){var t={};function i(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=t,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="",i(i.s=0)}([function(e,t,i){"use strict";i.r(t);var r=class{constructor(e){this.id=e.id,this.title=e.title,this.description=e.description,this.priority=e.priority,this.isDone=e.isDone}};var n=function(e){let t=`<article id='${e.id}'\n  ${e.isDone?'class="card__wrapper open"':"class='card__wrapper'"} >\n  <div class='card__text'>\n    <div id='${"card__title"+e.id}' class='card__title'>\n    ${e.title}</div>\n    <input value='${e.title}' maxlength="30"\n    id="${"edited-title"+e.id}" class='edited-title hide'/>\n    <div id='${"card__description"+e.id}' class='card__description'>\n    ${e.description}</div>\n    <textarea value='${e.description}' maxlength="150" id="${"edited-description"+e.id}" class='edited-description hide'>${e.description}</textarea>\n  </div>\n  <div class='card__down'>\n    <span id='${"card__priority"+e.id}' class='card__priority'>\n    ${e.priority}</span>\n    <div class="edit-select select">\n      <select id='${"edited-priority"+e.id}'\n        class="edited-priority hide" >\n        <option selected value="High">High</option>\n        <option value="Normal">Normal</option>\n        <option value="Low">Low</option>\n      </select>\n    </div>\n    <span id='${"card__edit"+e.id}'  class='card__edit'>\n      <div class='extra-img'>...</div>\n      <div class='extra-menu'>\n        <button class='extra-menu__done'>Done</button>\n        <button class='extra-menu__edit'>Edit</button>\n        <button class='extra-menu__delete'>Delete</button>\n          </div>\n    </span>\n    <span id='${"ok"+e.id}' class='ok'>OK</span>\n  </div>\n</article>`;y.insertAdjacentHTML("afterbegin",t);let i=document.querySelector(".extra-menu__edit"),r=document.querySelector(".extra-menu__done"),n=document.querySelector(".extra-menu__delete"),d=document.querySelector(".ok");r.addEventListener("click",c.doneCard),n.addEventListener("click",c.deleteCard),i.addEventListener("click",s),d.addEventListener("click",u)};var d={retrieveId:(e,t)=>e.target.closest(t).getAttribute("id"),findIndex:(e,t)=>t.findIndex(t=>t.id===e)};var o=function(e){let t,i,r,d=h.value,o=b.value;t="All"===d&&"All"===o?e.filter(e=>e.title.toLowerCase().includes(L.value.toLowerCase())):"All"===d&&"All"!==o?(i=e.filter(e=>e.priority===o)).filter(e=>e.title.toLowerCase().includes(L.value.toLowerCase())):"open"===d&&"All"!==o?(i=(r=e.filter(e=>!1===e.isDone)).filter(e=>e.priority===o)).filter(e=>e.title.toLowerCase().includes(L.value.toLowerCase())):"done"===d&&"All"!==o?(i=(r=e.filter(e=>!0===e.isDone)).filter(e=>e.priority===o)).filter(e=>e.title.toLowerCase().includes(L.value.toLowerCase())):(r="open"===d?e.filter(e=>!1===e.isDone):e.filter(e=>!0===e.isDone)).filter(e=>e.title.toLowerCase().includes(L.value.toLowerCase())),y.innerHTML="",t.forEach(e=>n(e))};let l=[],c={addCard(){if(p.value){let e=new r({id:`f${(~~(1e5*Math.random())).toString()}`,title:p.value,description:f.value,priority:v.value,isDone:!1});l.push(e),n(e),p.value="",f.value="",p.classList.remove("alert"),S()}else p.setAttribute("placeholder","Card must have a title!"),p.classList.add("alert")},doneCard(e){let t=d.findIndex(d.retrieveId(e,"article"),l),i="#"+l[t].id,r=document.querySelector(i),n=l.find(e=>e.id===l[t].id);r.classList.toggle("open"),n.isDone?n.isDone=!1:n.isDone=!0},deleteCard(e){d.findIndex(d.retrieveId(e,"article"),l);e.target.closest("article").remove()}},a=function(){o(l)};function s(e){console.log(l);let t=d.findIndex(d.retrieveId(e,"article"),l),i=l[t].id,r="#card__title"+i,n="#card__description"+i,o="#card__priority"+i,c="#card__edit"+i,a="#edited-title"+i,s="#edited-description"+i,u="#edited-priority"+i,p="#ok"+i,f=document.querySelector(a),v=document.querySelector(s),y=document.querySelector(u),m=document.querySelector(r),_=document.querySelector(n),g=document.querySelector(o),L=document.querySelector(c),h=document.querySelector(p);return f.classList.toggle("hide"),v.classList.toggle("hide"),y.classList.toggle("hide"),m.classList.toggle("hide"),_.classList.toggle("hide"),g.classList.toggle("hide"),L.classList.toggle("hide"),h.classList.toggle("hide"),{defTitle:m,editedTitle:f,defDescription:_,editedDescription:v,defPriority:g,editedPriority:y,id:i,listIndex:t,ok:h,dots:L}}function u(e){let t=s(e);t.defTitle.innerHTML=t.editedTitle.value,t.defDescription.innerHTML=t.editedDescription.value,t.defPriority.innerHTML=t.editedPriority.value;let i=l.find(e=>e.id===t.id);i.title=t.defTitle.value,i.description=t.defDescription.value,i.priority=t.defPriority.value}i.d(t,"inputTitle",(function(){return p})),i.d(t,"inputDescription",(function(){return f})),i.d(t,"inputPriority",(function(){return v})),i.d(t,"cardsArea",(function(){return y})),i.d(t,"editMenu",(function(){return m})),i.d(t,"menu",(function(){return _})),i.d(t,"searchTitle",(function(){return g})),i.d(t,"inputSearch",(function(){return L})),i.d(t,"searchStatus",(function(){return h})),i.d(t,"searchPriority",(function(){return b})),i.d(t,"toggleEditMenu",(function(){return S}));const p=document.querySelector("#input-title"),f=document.querySelector("#input-description"),v=document.querySelector("#input-priority"),y=document.getElementById("cards-area"),m=document.getElementById("edit-menu"),_=document.getElementById("menu"),g=document.getElementById("search-title"),L=document.querySelector(".search-title__bar"),h=document.getElementById("search-status"),b=document.getElementById("search-priority"),S=function(){p.setAttribute("placeholder","Your title.."),p.classList.remove("alert"),m.classList.toggle("hidden")};m.addEventListener("click",(function(e){e.preventDefault(),"button-save"===e.target.id?c.addCard(e):"button-cancel"===e.target.id?S():"input-title"===e.target.id&&(p.setAttribute("placeholder","Your title.."),p.classList.remove("alert"))})),_.addEventListener("click",(function(e){e.preventDefault(),"button-create"===e.target.id&&S()})),g.addEventListener("input",a),h.addEventListener("change",a),b.addEventListener("change",a)}]);