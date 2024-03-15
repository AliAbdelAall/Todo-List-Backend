<?php
include("connection.php");

$identifier =$_POST['identifier'];
$password = $_POST['password'];

if(filter_var($identifier, FILTER_VALIDATE_EMAIL)){
  $query = $mysqli->prepare("
  select * 
  from users 
  where email = ?");
}else{
  $query = $mysqli->prepare("
  select id, username, email, password 
  from users 
  where username = ?");
}

$query->bind_param("s", $identifier);
$query->execute();
$query->store_result();
$query->bind_result($id, $username, $email, $hashed_password);
$query->fetch();
$num_rows = $query->num_rows();

if ($num_rows == 0){
  $response['status'] = "user not found";
}else{ 
  if (password_verify($password, $hashed_password)){
    $response['status'] = "success";
    $response['user_id'] = $id;
    $response['username'] = $username;
    $response['email'] = $email;
  
    $todo_query = $mysqli->prepare('
    select *
    from todos
    where user_id = ?');
    $todo_query->bind_param('i', $id);
    $todo_query->execute();
    $todo_query->store_result();
    $num_rows = $todo_query->num_rows();
    
    if($num_rows == 0){
      $response['todos'] = [];
    }else{
      $todos =[];
      $todo_query->bind_result($id, $user_id, $todo, $completed);
      while($todo_query-> fetch()){
        $todo = [
          'id' => $id,
          'user_id' => $user_id,
          'todo' => $todo,
          'completed' => $completed
        ];
        $todos[] = $todo;
      };
      $response['todos'] = $todos;
    }
  }else{
    $response['status'] = "incorrect credentials";
  }
} 

echo json_encode($response);
