(async function () {
  let tableArea = document.getElementById('table');
  let loadingGif = document.getElementById('preloader');
  tableArea.style.display = 'none';
  loadingGif.style.display = 'block';
  const resp = await fetch('https://ivnik20-web.onrender.com/books/period/RUSSIAN').then(
    (response) => response.json(),
  );
  for (const element of resp.books) {
    tableArea.innerHTML +=
      "<tr class='tr-odd tr'> <td> <a href = 'https://ivnik20-web.onrender.com/bookreviews/" +
      element.id +
      "'>" +
      element.title +
      '</a></td> <td>' +
      element.bookAuthor +
      '</td> <td>' +
      element.comment +
      '</td></tr>';
  }
  loadingGif.style.display = 'none';
  tableArea.style.display = 'block';
})();
