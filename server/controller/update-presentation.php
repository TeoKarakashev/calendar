<?php
    require_once '../service/PresentationOrchestrator.php';
    require_once '../utils/testInputUtility.php';

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    $errors = [];

    if ($_POST) {
        $username = isset($_POST['username']) ? testInput($_POST['username']) : '';
        $presentation = $_POST['presentation'];
        $presentationOrchestrator = new PresentationOrchestrator();

        $presentationOrchestrator->removeUserFromPresentation(['username' => $username]);

        $updatePresentation = $presentationOrchestrator->updatePresentation(['username' => $username, 'presentation' => $presentation]);

        
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