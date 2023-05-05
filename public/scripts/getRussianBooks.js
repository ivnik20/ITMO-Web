(function () {
  let tableArea = document.getElementById('table');
  let loadingGif = document.getElementById('preloader');
  tableArea.style.display = 'none';
  loadingGif.style.display = 'block';
  fetch('https://ivnik20-web.onrender.com/books/period/RUSSIAN')
    .then((response) => response.json())
    .then((json) =>
      json.forEach(
        (element) =>
          (tableArea.innerHTML +=
            "<tr class='tr-odd tr'> <td> <a href = 'https://ivnik20-web.onrender.com/bookreviews/" +
            element.id +
            "'>" +
            element.title +
            '</a></td> <td>' +
            element.bookAuthor +
            '</td> <td>' +
            element.comment +
            '</td></tr>'),
      ),
    )
    .then(
      (json) => {
        loadingGif.style.display = 'none';
        tableArea.style.display = 'block';
      },
      () => (tableArea.innerText = 'Ошибка!'),
    );
})();
