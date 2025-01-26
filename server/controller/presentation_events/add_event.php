<?php
  require_once '../service/UserOrchestrator.php';
  require_once '../service/PresentationEventOrchestrator.php';

  session_start();
  header('Content-type: application/x-www-form-urlencoded');

  //$username = isset($_POST['username']) ? testInput($_POST['username']) : '';
  $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
  $user = new User($username, '', '', '', []);

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
