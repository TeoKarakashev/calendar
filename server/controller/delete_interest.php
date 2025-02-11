<?php
  require_once '../service/InterestsOrchestrator.php';

  session_start();

  $interestsOrchestrator = new InterestsOrchestrator();

  if ($_POST) {
    $result = $interestsOrchestrator->deleteInterest(['interest' => $_POST['interest']]);

    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
  }
?>