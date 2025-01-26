<?php
  require_once '../service/PresentationEventOrchestrator.php';

  session_start();

  $eventsOrchestrator = new PresentationEventService();

  if ($_POST) {
    $result = $eventsOrchestrator->deleteEvent($_POST['presentationTitle'], $_POST['presenter']);

    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
  }
?>