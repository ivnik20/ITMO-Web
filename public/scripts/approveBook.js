function approveBook(id, bookId) {
  fetch(
    'https://ivnik20-web.onrender.com/books/' + bookId.toString() + '/' + id.toString(),
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    },
  )
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        alert('Error! Check your input');
      }
    })
    .then((json) => console.log(json));
}
