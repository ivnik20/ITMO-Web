(
    function (){
        let commentArea = document.getElementById('table');
        let loadingGif = document.getElementById('preloader');
        commentArea.style.display = "none"
        loadingGif.style.display = "block"
            fetch('https://jsonplaceholder.typicode.com/comments/1')
                .then(response => response.json())
                .then(json => commentArea.innerHTML += "<tr class='tr-odd tr'> <td>" + json.body.split(" ")[3] + "</td> <td>" + json.name + "</td> <td>" + json.body + "</td></tr>");
            fetch('https://jsonplaceholder.typicode.com/comments/2')
                .then(response => response.json())
                .then(json => commentArea.innerHTML += "<tr class='tr-even tr'> <td>" + json.body.split(" ")[3] + "</td> <td>" + json.name + "</td> <td>" + json.body + "</td></tr>")
                .then(json => {
                    loadingGif.style.display = "none"
                    commentArea.style.display = "block"
                }, () => commentArea.innerText = "Ошибка!")
    }

)()