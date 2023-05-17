function saveBook(id) {
  console.log(
    JSON.stringify({
      title: document.getElementById('book').value,
      authorId: id,
      bookAuthor: document.getElementById('author').value,
      comment: document.getElementById('comment').value,
      categoryTitle: document.getElementById('categories').value.split(' ')[0],
    }),
  );
  fetch('https://ivnik20-web.onrender.com/books', {
    method: 'POST',
    body: JSON.stringify({
      title: document.getElementById('book').value,
      authorId: id,
      bookAuthor: document.getElementById('author').value,
      comment: document.getElementById('comment').value,
      categoryTitle: document.getElementById('categories').value.split(' ')[0],
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error! Check your input');
      }
    })
    .then((json) => console.log(json));
  document.location.reload();
}
