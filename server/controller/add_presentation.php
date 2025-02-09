<?php
  require_once '../service/PresentationOrchestrator.php';

  session_start();
  header('Content-type: application/x-www-form-urlencoded');
  
  $presentationOrchestrator = new PresentationOrchestrator();

  if ($_POST) {
    $result = $presentationOrchestrator->createPresentation(['presentation' => $_POST['presentation']]);

  http_response_code(201);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'result' => $result]);
  }
?>
