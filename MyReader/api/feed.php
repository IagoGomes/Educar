$mysqli = new mysqli("localhost", "root", "", "users");
$query = "SELECT * FROM table";
$dbresult = $mysqli->query($query);
 
while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){
 
    $data[] = array(
        'id' => $row['id'],
        'name' => $row['name']
    );
}
 
if($dbresult){
    $result = "{'success':true, 'data':" . json_encode($data) . "}";              
}
else {
    $result = "{'success':false}";
}

echo($result);