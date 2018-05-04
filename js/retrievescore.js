function scoreBoard(){   
            var score = document.createElement("div");
            score.setAttribute("id", "scoreBoard");
            document.getElementById("mainMenu").appendChild(score);
         
            $.ajax({
                url: "../highscores.php",
                dataType: "json",
                type: "GET",
                data: {output: 'json'},
                success: function(data) {
    
                    console.log(data);
                    // score array
                    var tableData = "<table><tr><th>Username</th><th>Score</th></tr>";
                    
                    for(var key in data["score"]) {
                      tableData += "<tr>";
                      for(var value in data["score"][key]) {
                        tableData += "<td>" + data["score"][key][value] + "</td>";
                      }
                      tableData += "</tr>";
                    }
                  
                    tableData += "</table>";
                    
                    $("#scoreBoard").html(tableData);
    
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    $("#scoreBoard").text(textStatus + " " + errorThrown
                        + jqXHR.responseText);
                }
            });

            document.getElementById("play").style.visibility = "hidden";
            document.getElementById("score").style.visibility = "hidden";
            document.getElementById("rule").style.visibility = "hidden";
            var back = document.createElement('button');
            back.setAttribute("onclick", "backScore()");
            back.setAttribute("id", "backScore");
            back.setAttribute("class", "backs");
            document.getElementById("mainMenu").appendChild(back);
}