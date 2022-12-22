function loadComment(name) {
    let text = document.getElementById("table");
    let Row = "";
    if (name === 'user' || name === 'error') {
        return;
    }
    let info = JSON.parse(localStorage.getItem(name));
    let countRows = (text.innerHTML.split("tr").length - 1)/4-1;
    if(countRows%2===0){
        Row += "<tr class='tr-odd tr'>";
        Row += "<td>" + name + "</td>";
        Row += "<td>" + info[0][0] + "</td>";
        Row += "<td>" + info[0][1] + "</td></tr>";
    }
    else{
        Row += "<tr class='tr-even tr'>";
        Row += "<td>" + name + "</td>";
        Row += "<td>" + info[0][0] + "</td>";
        Row += "<td>" + info[0][1] + "</td></tr>";
    }
    text.innerHTML += Row;
}