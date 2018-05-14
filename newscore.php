<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "On $methodType");

    $servername = "localhost";
    $dblogin = "foodcrus_taylor";
    $password = "group26publishedmilk";
    $dbname = "foodcrus_scores";

    if ($methodType === 'POST') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            
            if(isset($_POST["username"]) && !empty($_POST["username"])
                && isset($_POST["score"]) && !empty($_POST["score"])){

                $username = $_POST["username"];
                $score = $_POST["score"];

                $data = array("msg" => "Thank you $username, your highscore of $score has been updated!",
                    "username" => "$username", "score" => "$score");
        
                $trimmed = trim(strtolower($username));    
                
                if($trimmed == "bruce link" || $trimmed == "bruce" || $trimmed == "brucelink") {
                    $data["msg"] = $data["msg"] . "Just like in life and Java, food waste is cumulative.";
                }
                    
                try {
                
                    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);
                    
                    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                    
                    $sql = "INSERT INTO level1 (username, score) VALUES ('$username', '$score')";
                    
                    $statement = $conn->prepare($sql);
                    $statement->execute();
                    
                } catch(PDOException $e) {
                    $data = array("error", $e->getMessage());
                }

            } else {
                $data = array("msg" => "Either username or score were not filled out correctly.");
            }



        } else {
            $data = array("msg" => "Has to be an AJAX call.");
        }


    } else {
        $data = array("msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
