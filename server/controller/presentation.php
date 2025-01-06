<?php
  require_once '../utils/testInputUtility.php';
  require_once '../service/PresentationOrchestrator.php';

  session_start();

  $errors = [];
  
  //$username = isset($_POST['username']) ? testInput($_POST['username']) : '';
  $username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
  $presentationOrchestrator = new PresentationOrchestrator();

  $recommendedPresentations = $presentationOrchestrator->getAllUntakenRecommendedPresentations(['username' => $username]);

  $allPresentations = $presentationOrchestrator->getAllUntakenPresentations();

  $currentPresentation = $presentationOrchestrator->getPresentationForUser(['username' => $username]);


  if (!$errors) {
    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'recommended' => $recommendedPresentations,
      'all' => $allPresentations,
      'current' => $currentPresentation]);
     
  } else {
    http_response_code(400);
     echo json_encode([
      'success' => false,
      'message' => $errors]);
  }
?>