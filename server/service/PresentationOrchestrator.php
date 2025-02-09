<?php

require_once '../db/PresentationRepository.php';
class PresentationOrchestrator {
    private $presentationRepository;
    private $title;
    private $isTaken;
    private $username;   

    public function __construct() {
        $this->username = '';
        $this->isTaken = false;
        $this->title = '';
        
        $this->presentationRepository = new PresentationRepository();
    }

    public function getTitle() {
        return $this->title;
    }
    
   public function getIsTaken() {
    return $this->isTaken;
   }
   public function getUsername() {
    return $this->username;
   }

    public function createPresentation($data) {
        $result = $this->presentationRepository->createPresentation($data);
        return $result['success'];
    }

   public function getAllPresentations() {
    try {
        $selectPresentations =  $this->presentationRepository->getAllPresentations();
        if($selectPresentations['success']){
            $presentationData = $selectPresentations['data']->fetchAll(PDO::FETCH_ASSOC);
            $allPresentations = [];
            foreach ($presentationData as $presentation) {
                $allPresentations[] = [
                    'username' => $presentation['username'],
                    'is_taken' => (bool)$presentation['is_taken'],
                    'title' => $presentation['title']
                ];
            }
            return $allPresentations;
        } else{
            return [];
        }
    } catch (Exception $e) {
        // Handle exceptions (e.g., database errors)
        error_log("Error fetching presentations: " . $e->getMessage());
        return [];
    }
   }

   public function getAllUntakenRecommendedPresentations($data){
    $selectPresentations =  $this->presentationRepository->getAllUntakenRecommendedPresentationsQuery($data);
    if($selectPresentations['success']){
        $presentationData = $selectPresentations['data']->fetchAll(PDO::FETCH_ASSOC);
        return array_column($presentationData, 'title');
    } else{
        return [];
   }
}

   public function getAllUntakenPresentations(){
    $selectPresentations =  $this->presentationRepository->getAllUntakenPresentationsQuery();
    if($selectPresentations['success']){
        $presentationData = $selectPresentations['data']->fetchAll(PDO::FETCH_ASSOC);
        return array_column($presentationData, 'title');
    } else{
        return [];
    }
   }

   public function removeUserFromPresentation($data){
    $result = $this->presentationRepository->removeUserFromPresentationQuery($data);
    return $result['success'];
   }

   public function deletePresentation($data){
    $result = $this->presentationRepository->deletePresentation($data);
    return $result['success'];
   }

   public function updatePresentation($data){
    $result = $this->presentationRepository->updatePresentationQuery($data);
    return $result['success'];
   }

   public function updatePresentationTitle($data){
    $result = $this->presentationRepository->updatePresentationTitle($data);
    return $result['success'];
   }

   public function getPresentationForUser($data){
    $selectPresentation = $this->presentationRepository->getPresentationForUserQuery($data);
    if($selectPresentation['success']){
        $presentationData = $selectPresentation['data']->fetchAll(PDO::FETCH_ASSOC);
        if(empty($presentationData)) {
            return '';
        } else {
            return array_column($presentationData, 'title')[0];
        }
    } else{
        return '';
    }
   }
}
?>