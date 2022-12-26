(
    function (){
        let commentArea = document.getElementById('table');
        let loading = "<tr className='tr-odd tr'> <td>Загрузка</td> <td>Загрузка</td> <td>Загрузка</td></tr>";
        let clear = commentArea.innerHTML;
        commentArea.innerHTML += loading;
            fetch('https://jsonplaceholder.typicode.com/comments/1')
                .then(response => response.json())
                .then(json => commentArea.innerHTML = clear + "<tr class='tr-odd tr'> <td>" + json.body.split(" ")[3] + "</td> <td>" + json.name + "</td> <td>" + json.body + "</td></tr>");
            fetch('https://jsonplaceholder.typicode.com/comments/2')
                .then(response => response.json())
                .then(json => commentArea.innerHTML += "<tr class='tr-even tr'> <td>" + json.body.split(" ")[3] + "</td> <td>" + json.name + "</td> <td>" + json.body + "</td></tr>");
    }

)()