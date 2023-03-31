(function () {
  let startTime = new Date().getTime();
  function timer() {
    let element = document.getElementById('load-time');
    element.innerHTML += new Date().getTime() - startTime + ' ms (client)';
  }

  document.addEventListener('DOMContentLoaded', function () {
    timer();
  });
})();
