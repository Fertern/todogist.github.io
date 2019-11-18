// For load cards from localStorage
import Card from "./card";
import renderCards from "./renderer";
function handlePageLoad(allCards) {
  if (JSON.parse(localStorage.getItem("globalStorage"))) {
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
    allCards.forEach(item => renderCards(item));
  }
}
export default handlePageLoad;
