<?php
    require_once '../service/UserOrchestrator.php';
    require_once '../utils/testInputUtility.php';

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    $errors = [];

    if ($_POST) {
        $username = isset($_POST['username']) ? testInput($_POST['username']) : '';
        $password = isset($_POST['password']) ? testInput($_POST['password']) : '';

        if (!$username) {
            $errors[] = 'Username is required';
        }

        if (!$password) {
            $errors[] = 'Password is required';
        }

        if ($username && $password) {
            $user = new User($username, $password, '', '', '', '');
            $userExist = $user->login();

            if ($userExist) {
                $_SESSION['username'] = $username;
                $_SESSION['role'] = $user->getRole();
            } else {
                $errors[] = 'Username or password is incorrect!';
            }
        }
    } else {
        $errors[] = 'Invalid request!';
    }

    if (!$errors) {
        http_response_code(200);
        echo json_encode(['success' => true,
                          'message' => 'User logged in',
                          'username' => $_SESSION['username'],
                          'role' => $_SESSION['role']]);
        
    } else {
        http_response_code(401);

        echo json_encode(['success' => false, 'message' => $errors]);
    }
?>