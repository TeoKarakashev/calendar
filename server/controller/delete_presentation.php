<?php
  require_once '../service/PresentationOrchestrator.php';

  session_start();

  $presentationOrchestrator = new PresentationOrchestrator();

  if ($_POST) {
    $title = $_POST['presentation'];
    $result = $presentationOrchestrator->deletePresentation(['title' => $title]);

    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
  }
?>