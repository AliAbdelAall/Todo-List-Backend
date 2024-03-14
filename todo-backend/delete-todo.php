<?php
include("connection.php");

$id = $_POST['id'];

$query = $mysqli->prepare("select * from todos where id = ?");
$query->bind_param("i", $id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if($num_rows == 0){
  $response['status'] = "delete failed";
  $response['message'] = "todo not found";
}else{
  $delete_todo = $mysqli->prepare("delete from todos where id = ?");
  $delete_todo->bind_param("i", $id);
  $delete_todo->execute();
  
  $response['status'] = 'sucsess';
  $response['message'] = "todo sucsessfuly deleted";
}

echo json_encode($response);