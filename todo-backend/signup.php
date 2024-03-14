<?php
include("connection.php");

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_user = $mysqli -> prepare('select * from users where username = ? or email = ?');
$check_user->bind_param('ss', $username, $email);
$check_user->execute();
$check_user->store_result();
$user_exists = $check_user->num_rows();

if ($user_exists == 0){
  $hashed_password = password_hash($password, PASSWORD_BCRYPT);
  $query = $mysqli->prepare('insert into users (id, username, email, password) value(null,?, ?, ?)');
  $query->bind_param('sss', $username, $email, $hashed_password);
  $query->execute();
  $response['status'] = "success";
  $response['message'] = "user $username was created successfully";
}else{
  $response['status'] = "user already exists";
  $response['message'] = "user $username wasn't created";
}

echo json_encode($response);
// echo json_encode(["username"=>$username]);
