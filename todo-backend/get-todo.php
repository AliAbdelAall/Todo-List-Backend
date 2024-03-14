<?php
include('connection.php');

$user_id = $_POST['user_id'];

$query = $mysqli->prepare('
select *
from todos
where user_id = ?');
$query->bind_param('i', $user_id);
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if($num_rows == 0){
  $response['status'] = "no todos found";
}else{
  $todos =[];
  $query->bind_result($id, $user_id, $todo, $completed);
  while($query-> fetch()){
    $todo = [
      'id' => $id,
      'user_id' => $user_id,
      'todo' => $todo,
      'completed' => $completed
    ];
    $todos[] = $todo;
  }
  $response['status'] = 'success';
  $response['todos'] = $todos;
}
echo json_encode($response);