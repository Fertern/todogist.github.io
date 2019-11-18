//For search current id
const finder = {
  retrieveId(e, location) {
    var taskId = e.target.closest(location).getAttribute("id");
    return taskId;
  },
  findIndex(taskId, globalArray) {
    return globalArray.findIndex(item => item.id === taskId);
  }
};
export default finder;
