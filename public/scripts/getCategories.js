(async function () {
  const rus = fetch('https://ivnik20-web.onrender.com/categories/period/RUSSIAN').then(
    (response) => response.json(),
  );
  await updateSelect(rus);
  const am = fetch('https://ivnik20-web.onrender.com/categories/period/AMERICAN').then(
    (response) => response.json(),
  );
  await updateSelect(am);
})();

async function updateSelect(promise) {
  let selectArea = document.getElementById('categories');
  const data = await promise;
  console.log(data);
  for (const element of data.categories) {
    let per = ' (Американский период)';
    if (element.period === 'RUSSIAN') {
      per = ' (Русский период)';
    }
    selectArea.innerHTML += '<option>' + element.title + per + '</option>';
  }
}
