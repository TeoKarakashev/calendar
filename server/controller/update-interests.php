<?php
    require_once '../service/UserOrchestrator.php';
    require_once '../utils/testInputUtility.php';

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    $errors = [];

    if ($_POST) {
        $username = isset($_POST['username']) ? testInput($_POST['username']) : '';
        $interests = $_POST['interests'];
        $user = new User($username, '', '', '', []);

        $result = $user->removeInterestsForUser($username);

        if($result){
           $result =  $user->addInterestsForUser($username, $interests);
           if(!$result){
            $errors[] = 'Could not add interests';
           }
        } else {
            $errors[] = 'Could not remove interests';
        }

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