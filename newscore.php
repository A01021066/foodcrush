<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "On $methodType");

    $servername = "localhost";
    $dblogin = "root";
    $password = "";
    $dbname = "scores";

    if ($methodType === 'POST') {

        if(isset($_SERVER['HTTP_X_REQUESTED_WITH'])
            && strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest') {
            // yes, is AJAX call
            // answer POST call and get the data that was sent
            if(isset($_POST["username"]) && !empty($_POST["username"])
                && isset($_POST["score"]) && !empty($_POST["score"])){


                // get the data from the post and store in variables
                $username = $_POST["username"];
                $score = $_POST["score"];

                $data = array("msg" => "Thank you $username, your highscore of $score has been updated!",
                    "username" => "$username", "score" => "$score");
                    
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
            // not AJAX
            $data = array("msg" => "Has to be an AJAX call.");
        }


    } else {
        // simple error message, only taking POST requests
        $data = array("msg" => "Error: only POST allowed.");
    }

    echo json_encode($data, JSON_FORCE_OBJECT);

?>
