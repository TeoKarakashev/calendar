<?php
    require_once '../service/PresentationOrchestrator.php';
    require_once '../utils/testInputUtility.php';

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    $errors = [];

    if ($_POST) {
        $presentation = $_POST['presentation'];
        $title = $_POST['title'];
        $presentationOrchestrator = new PresentationOrchestrator();
        $updatePresentationTitle = $presentationOrchestrator->updatePresentationTitle(['originalTitle' => $presentation, 'title' => $title]);
    } else {
        $errors[] = 'Invalid request!';
    }

    if (!$errors) {
        http_response_code(200);
        echo json_encode(['success' => true,
                          'message' => 'Interests updated']);
        
    } else {
        http_response_code(401);

        echo json_encode(['success' => false, 'message' => $errors]);
    }
?>