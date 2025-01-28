<?php
    require_once '../service/PresentationInterestsService.php';

    session_start();

    $presentationInterestsService = new PresentationInterestsService();

    $result = $presentationInterestsService->getPresentationInterests();

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'success',
        'data' => $result
    ]);
?>
