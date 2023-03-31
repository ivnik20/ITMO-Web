document.addEventListener('DOMContentLoaded', () => {
  let add = document.getElementById('submit');
  add.addEventListener('submit', (e) => {
    e.preventDefault();
  });
});
function saveComment() {
  let patio = [];
  let patioName = document.getElementById('author').value;
  let patioAddress = document.getElementById('book').value;
  let patioDescription = document.getElementById('description').value;
  if (patioName === '') return;
  patio.push([patioAddress, patioDescription]);
  localStorage.setItem(patioName, JSON.stringify(patio));
  reset();
  loadComment(patioName);
}
function reset() {
  document.getElementById('author').value = '';
  document.getElementById('book').value = '';
  document.getElementById('description').value = '';
}
