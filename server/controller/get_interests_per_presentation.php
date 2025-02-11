<?php
    require_once '../service/PresentationInterestsService.php';

    session_start();

    $presentationInterestsService = new PresentationInterestsService();
    $presentation = isset($_GET['presentation']) ? $_GET['presentation'] : '';

    if (!$presentation) {
        echo json_encode(["success" => false, "message" => "Missing presentation key"]);
        exit;
    }

    try {
        $interestsPerPresentation = $presentationInterestsService->getInterestsForPresentation(['presentation' => $presentation]);
        echo json_encode(["success" => true, "interests" => $interestsPerPresentation]);
    } catch (Exception $e) {
        echo json_encode(["success" => false, "message" => $e->getMessage()]);
    }
?>