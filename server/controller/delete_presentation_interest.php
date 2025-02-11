<?php
  require_once '../service/PresentationInterestsService.php';

  session_start();

  $presentationInterestsService = new PresentationInterestsService();

  if ($_POST) {
    $result = $presentationInterestsService->deletePresentationInterest(['presentation' => $_POST['presentation'], 'interest' => $_POST['interest']]);

    http_response_code(200);
    echo json_encode([
      'success' => true,
      'message'=> 'success',
      'data' => $result]);
  }
?>