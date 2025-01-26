<?php
  require_once '../service/PresentationEventOrchestrator.php';

  session_start();
  header('Content-type: application/x-www-form-urlencoded');

  $eventsOrchestrator = new PresentationEventService();

  if ($_POST) {
    $result = $eventsOrchestrator->addEvent($_POST['presentationTitle'], $_POST['presenter'], $_POST['date']);

  http_response_code(201);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'result' => $result]);
  }
?>
