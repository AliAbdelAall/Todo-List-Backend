<?php
include("connection.php");

$id = $_POST['id'];
$todo = $_POST['todo'];
$completed = $_POST['completed'];

$query = $mysqli->prepare("select * from todos where id = ?");
$query->bind_param("i", $id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if($num_rows == 0){
  $response['status'] = "edit failed";
  $response['message'] = "todo not found";
}else{
  $edit_todo = $mysqli->prepare("update todos set todo = ?, completed = ?  where id = ?");
  $edit_todo->bind_param("sii",$todo, $completed, $id);
  $edit_todo->execute();
  
  $response['status'] = 'sucsess';
  $response['message'] = "todo sucsessfuly edited";
}

echo json_encode($response);