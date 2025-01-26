<?php
  require_once '../service/UserOrchestrator.php';
  require_once '../service/PresentationEventOrchestrator.php';

  session_start();

  //$username = isset($_POST['username']) ? testInput($_POST['username']) : '';
  $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
  $user = new User($username, '', '', '', []);

  $eventsOrchestrator = new PresentationEventService();

  $result = $eventsOrchestrator->getEvents();

  http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
?>