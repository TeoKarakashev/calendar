<?php
    require_once '../service/PresentationInterestsService.php';

    session_start();

    $errors = [];

    $presentationInterestsService = new PresentationInterestsService();
    $result = $presentationInterestsService->getPresentationInterests();

    if ($_POST) {
        $presentation = $_POST['presentation'];
        $interestsPerPresentation = $presentationInterestsService->getInterestsPerPresentation(['presentation' => $presentation]);
    } else {
        $errors[] = 'Invalid request!';
    }

    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'success',
        'data' => $result
    ]);
?>
