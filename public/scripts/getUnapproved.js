(async function () {
  document.getElementById('table').style.display = 'none';
  document.getElementById('preloader').style.display = 'block';
  const res = fetch(
    'https://ivnik20-web.onrender.com/books/books/noapprove',
  ).then((response) => response.json());
  await updateTable(res);
})();
async function getUserName(id) {
  const res = await fetch('https://ivnik20-web.onrender.com/users/id/' + id)
    .then((response) => response.json())
    .then((json) => json.name);
  return res;
}
async function updateTable(promise) {
  let tableArea = document.getElementById('table');
  let loadingGif = document.getElementById('preloader');
  const data = await promise;
  for (const element of data) {
    const name = await getUserName(element.authorId);
    tableArea.innerHTML +=
      "<tr class='tr-odd tr'> <td>" +
      element.bookAuthor +
      '</td> <td>' +
      element.categoryTitle +
      '</td> <td>' +
      element.title +
      '</td> <td>' +
      element.comment +
      '</td> <td>' +
      name;
  }
  loadingGif.style.display = 'none';
  tableArea.style.display = 'block';
}
