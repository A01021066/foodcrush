<?php
    $methodType = $_SERVER['REQUEST_METHOD'];
    $data = array("status" => "fail", "msg" => "On $methodType");

    $servername = "localhost";
    $dblogin = "root";
    $password = "";
    $dbname = "scores";

    if ($methodType === 'GET') {
        if(isset($_GET['output'])) {
            $output = $_GET['output'];


            try {
                
                $conn = new PDO("mysql:host=$servername;dbname=$dbname", $dblogin, $password);
                
                $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
                
                $sql = "SELECT username, score FROM level1 ORDER BY score DESC LIMIT 20";
                
                $statement = $conn->prepare($sql);
                $statement->execute();
                
                $scoresarray = $statement->fetchAll(PDO::FETCH_ASSOC);
                
                $data['score'] = $scoresarray;
                
                if($output == "json") {
                    $data['status'] = 'success';
                    $data['msg'] = 'Retrieving data as JSON';
                    $json = json_encode($data);
                    echo $json;
                }
                
            } catch(PDOException $e) {
                $data = array("error", $e->getMessage());
            }
            

            

        } else {
            echo "Need a type of output!";
        }

    } else {
        echo $data;
    }



?>
