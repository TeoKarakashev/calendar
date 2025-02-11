<?php

require_once '../db/InterestsRepository.php';
class InterestsOrchestrator {
    private $interestsRepository;
    public $name;

    public function __construct() {
        $this->name = '';
        $this->interestsRepository = new InterestsRepository();
    }

    public function getName() {
        return $this->name;
    }
    
    public function getAllInterests(){
        return $this->interestsRepository->getAllInterests();
    }

    public function createInterest($data) {
        $result = $this->interestsRepository->createInterest($data);
        return $result['success'];
    }

    public function updateInterest($data){
        $result = $this->interestsRepository->updateInterest($data);
        return $result['success'];
    }

    public function deleteInterest($data){
        $result = $this->interestsRepository->deleteInterest($data);
        return $result['success'];
    }
}
?>