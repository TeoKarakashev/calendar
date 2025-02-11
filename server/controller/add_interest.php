<?php
  require_once '../service/InterestsOrchestrator.php';

  session_start();
  header('Content-type: application/x-www-form-urlencoded');
  
  $interestsOrchestrator = new InterestsOrchestrator();

  if ($_POST) {
    $result = $interestsOrchestrator->createInterest(['interest' => $_POST['interest']]);

  http_response_code(201);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'result' => $result]);
  }
?>
