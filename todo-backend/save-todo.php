<?php
include("connection.php");

$user_id = $_POST['user_id'];
$todo = $_POST['todo'];
$completed = $_POST['completed'];

$add_todo = $mysqli->prepare('insert into todos(id, user_id, todo, completed) value(null, ?, ?, ?)');
$add_todo->bind_param("isi",$user_id, $todo, $completed);
$add_todo->execute();

$response['status'] = "todo saved";
$response['id'] = $mysqli->insert_id;
$response['user_id'] = $user_id;
$response['todo'] = $todo;
$response['comleted'] = $completed;

echo json_encode($response);