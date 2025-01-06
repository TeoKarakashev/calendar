<?php
  require_once '../utils/testInputUtility.php';
  require_once '../service/UserOrchestrator.php';
  require_once '../service/InterestsOrchestrator.php';

  session_start();

  $errors = [];
  //$username = isset($_POST['username']) ? testInput($_POST['username']) : '';
  $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
  $user = new User($username, '', '', '', []);
  $interestOrchestrator = new InterestsOrchestrator();

  if ($user->getUserWithInterests()) {
     $result = $interestOrchestrator->getAllInterests();
     $allInterests = $result['data']->fetchAll(PDO::FETCH_ASSOC);
     $allInterests = array_map(function($interest) {
        return $interest['name'];
    }, $allInterests);
      
  } else {
    $errors[] = 'User was not found';
  }
  

  if (!$errors) {
    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'userInterests' => $user->getInterests(),
      'allInterests' => $allInterests]);
     
  } else {
    http_response_code(400);
     echo json_encode([
      'success' => false,
      'message' => $errors]);
  }
?>