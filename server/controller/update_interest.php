<?php
    require_once '../service/InterestsOrchestrator.php';
    require_once '../utils/testInputUtility.php';

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    $errors = [];

    if ($_POST) {
        $interestsOrchestrator = new InterestsOrchestrator();
        $updatePresentationTitle = $interestsOrchestrator->updateInterest(['interest' => $_POST['interest'], 'newInterestName' => $_POST['newInterestName']]);
    } else {
        $errors[] = 'Invalid request!';
    }

    if (!$errors) {
        http_response_code(200);
        echo json_encode(['success' => true,
                          'message' => 'Interest updated']);
        
    } else {
        http_response_code(401);

        echo json_encode(['success' => false, 'message' => $errors]);
    }
?>