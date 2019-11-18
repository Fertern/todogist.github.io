// For search target cards by search-bar
import { searchStatus, searchPriority, inputSearch, cardsArea } from "./index";
import renderCards from "./renderer";
function searchAll(allCards) {
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
  searchCards.forEach(item => renderCards(item));
}
export default searchAll;
