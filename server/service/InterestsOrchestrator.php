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
}
?>