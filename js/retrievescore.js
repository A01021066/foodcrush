function scoreBoard() {
    var message = document.createElement("p");
    message.setAttribute("id", "usermsg");
    document.getElementById("mainMenu").appendChild(message);

    var form = document.createElement("form");
    form.setAttribute("id", "nameInput");
    var nameField = document.createElement("input");
    nameField.setAttribute("type", "text");
    nameField.setAttribute("required", "required");
    nameField.setAttribute("placeholder", "Username");
    nameField.setAttribute("name", "username");
    form.appendChild(nameField);
    var submit = document.createElement("input");
    submit.setAttribute("type", "button");
    submit.setAttribute("value", "Submit");
    submit.setAttribute("onclick", "nameSubmit()");
    form.appendChild(submit);
    document.getElementById("mainMenu").appendChild(form);

    var score = document.createElement("div");
    score.setAttribute("id", "scoreBoard");
    document.getElementById("mainMenu").appendChild(score);

    buildTable();

    document.getElementById("play").style.visibility = "hidden";
    document.getElementById("score").style.visibility = "hidden";
    document.getElementById("rule").style.visibility = "hidden";
    var back = document.createElement('button');
    back.setAttribute("onclick", "backScore()");
    back.setAttribute("id", "backScore");
    back.setAttribute("class", "backs");
    document.getElementById("mainMenu").appendChild(back);
}

function nameSubmit() {
    var person = $("#nameInput").serializeArray()[0].value;
    var score = Math.floor(Math.random() * 60);

    $.ajax({
        url: "../newscore.php",
        type: "POST",
        dataType: "json",
        data: { 'username': person, 'score': score },
        success: function (data) {
            console.log("Data returned from server: ", data);
            $("#usermsg").text(data['msg']);
            buildTable();
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#usermsg").text(jqXHR.statusText);
        }
    });
}

function buildTable() {
    $.ajax({
        url: "../highscores.php",
        dataType: "json",
        type: "GET",
        data: { output: 'json' },
        success: function (data) {

            console.log(data);
            // score array
            var tableData = "<table><tr><th>Username</th><th>Score</th></tr>";

            for (var key in data["score"]) {
                tableData += "<tr>";
                for (var value in data["score"][key]) {
                    tableData += "<td>" + data["score"][key][value] + "</td>";
                }
                tableData += "</tr>";
            }

            tableData += "</table>";

            $("#scoreBoard").html(tableData);

        },
        error: function (jqXHR, textStatus, errorThrown) {
            $("#scoreBoard").text(textStatus + " " + errorThrown
                + jqXHR.responseText);
        }
    });
}