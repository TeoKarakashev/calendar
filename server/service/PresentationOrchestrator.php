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

   public function updatePresentation($data){
    $result = $this->presentationRepository->updatePresentationQuery($data);
    return $result['success'];
   }

   public function getPresentationForUser($data){
    $selectPresentation = $this->presentationRepository->getPresentationForUserQuery($data);
    if($selectPresentation['success']){
        $presentationData = $selectPresentation['data']->fetchAll(PDO::FETCH_ASSOC);
        $presentation =  array_column($presentationData, 'title')[0];
        return $presentation;
    } else{
        return '';
    }
   }
}
?>