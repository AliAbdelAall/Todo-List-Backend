<?php
include("connection.php");

$user_id =["user_id"];
$completed = 1;

$query = $mysqli->prepare('select * from todos where completed = ?');
$query->bind_param('i', $completed);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if ($num_rows == 0){
  $response['status'] = "not found";
  $response['message'] = "you don't have any completed todos";
}else{
  $response['status'] = "found";
  $response['message'] = "your score is " . $num_rows;
}
echo json_encode($response);