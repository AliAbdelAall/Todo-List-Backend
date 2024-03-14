<?php
include("connection.php");

$identifier =$_POST['identifier'];
$password = $_POST['password'];

if(filter_var($identifier, FILTER_VALIDATE_EMAIL)){
  $query = $mysqli->prepare("select * from users where email = ?");
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
    $response['status'] = "logged in";
    $response['user_id'] = $id;
    $response['username'] = $username;
    $response['email'] = $email;
  }else{
    $response['status'] = "incorrect credentials";
  }
}
echo json_encode($response);