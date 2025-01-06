<?php
  require_once '../utils/testInputUtility.php';
  require_once '../service/UserOrchestrator.php';
  require_once '../service/PresentationOrchestrator.php';

  session_start();

  $errors = [];
  $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
  $user = new User($username, '', '', '', []);
  $presentationOrchestrator = new PresentationOrchestrator();
  
  $presentation = $presentationOrchestrator->getPresentationForUser(['username' => $username]);

  if ($user->getUserWithInterests()) {
  } else {
    $errors[] = 'User was not found';
  }
  

  if (!$errors) {
    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'firstName' => $user->getFirstName(),
      'lastName' => $user->getLastName(),
      'username' => $user->getUsername(),
      'interests' => $user->getInterests(),
      'presentation' => $presentation]);
     
  } else {
    http_response_code(400);
     echo json_encode([
      'success' => false,
      'message' => $errors]);
  }
?>