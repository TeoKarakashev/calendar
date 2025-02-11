<?php
  require_once '../service/PresentationInterestsService.php';

  session_start();

  $presentationInterestsService = new PresentationInterestsService();

  if ($_POST) {
    $result = $presentationInterestsService->addPresentationInterest(['presentation' => $_POST['presentation'], 'interest' => $_POST['interest']]);

  http_response_code(201);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'result' => $result]);
  }
?>