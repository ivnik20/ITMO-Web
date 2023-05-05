async function get(id) {
  document.getElementById('table').style.display = 'none';
  const mes = document.getElementById('empty_message');
  const preload = document.getElementById('preloader');
  mes.style.display = 'none';
  preload.style.display = 'block';

  const res = fetch('https://ivnik20-web.onrender.com/reviews/bookId/' + id).then(
    (response) => response.json(),
  );

  const data = await res;
  if (data.length === 0) {
    mes.style.display = 'block';
    preload.style.display = 'none';
  } else {
    await updateTable(res);
  }
}
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
    const name = await getUserName(element.userId);
    tableArea.innerHTML +=
      "<tr class='tr-odd tr'> <td>" +
      name +
      '</td> <td>' +
      element.rating +
      '</td> <td>' +
      element.review +
      '</td></tr>';
  }
  loadingGif.style.display = 'none';
  tableArea.style.display = 'block';
}
