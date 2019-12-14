<?php
  include "connect.php";
  $user = $_POST['username'];
  $pass = $_POST['pass'];
  $sql = "SELECT * FROM user WHERE username = '$user' and password = '$pass'";
  $result = $connect->query($sql);
  $row = $result->num_rows;
  $data = $result-> fetch_assoc();
  if($row == 0){
	header("Location: index.html");
  } else {
	session_start();
	$_SESSION['user'] = $data["id"]; 
	header("Location: ../home.html");
  }
  $connect->close();
?>
