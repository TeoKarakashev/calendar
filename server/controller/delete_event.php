<?php
  require_once '../service/PresentationEventOrchestrator.php';

  session_start();

  $eventsOrchestrator = new PresentationEventService();

  $result = $eventsOrchestrator->deleteEvent();

  http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
?>