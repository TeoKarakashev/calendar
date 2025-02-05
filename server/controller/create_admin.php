<?php
  require_once '../service/UserOrchestrator.php';
  require_once '../service/InterestsOrchestrator.php';

  header('Content-Type: text/plain'); 

  if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $user = new User('admin', 'admin', 'admin', 'admin');

    if (!$user->exists()) {
      $firstName = "Admin";
      $lastName = "User";
      $username = "admin";
      $passwordHash = password_hash("admin", PASSWORD_DEFAULT);

      $user->createUser($firstName, $lastName, $username, $passwordHash, 'admin');
    }

    http_response_code(200);
  } else {
    http_response_code(400);
  }
?>
