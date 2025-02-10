<?php

    header('Content-type: application/x-www-form-urlencoded');

    session_start();

    if (isset($_SESSION['username'])) {
        http_response_code(200);
        echo json_encode(['success' => true, 'user' => $_SESSION['username'], 'role' => $_SESSION['role']]);
    } else {
        http_response_code(401);
        echo json_encode(['success' => false, 'message' => 'Unauthorized']);
    }
?>