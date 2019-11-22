// For search target cards by search-bar
import { searchStatus, searchPriority, inputSearch } from "./index";
function search() {
  const cards = document.querySelectorAll("article"),
    status = searchStatus.value,
    priority = searchPriority.value,
    statuses = {
      all: "All",
      open: "open",
      done: "done"
    };

  cards.forEach(card => {
    card.classList.remove("hide");
    if (
      !document
        .querySelector("#card__title" + card.id)
        .innerHTML.toLowerCase()
        .includes(inputSearch.value.toLowerCase()) ||
      (status === statuses.open && card.classList.contains("done")) ||
      (status === statuses.done && !card.classList.contains("done")) ||
      (priority != "All" &&
        document.querySelector("#card__priority" + card.id).innerHTML !=
          priority)
    ) {
      card.classList.add("hide");
    }
  });
}
export default search;
