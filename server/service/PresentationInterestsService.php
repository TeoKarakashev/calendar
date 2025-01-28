<?php
    include '../db/PresentationInterestsRepository.php';

    class PresentationInterestsService {
        private $presentationInterestsRepository;

        public function __construct() {
            $this->presentationInterestsRepository = new PresentationInterestsRepository();
        }

        public function getPresentationInterests() {
            $result = $this->presentationInterestsRepository->getPresentationInterests();

            if($result['success']) {
                $presentationInterests = $result['data']->fetchAll(PDO::FETCH_ASSOC);
                return $presentationInterests;
            } else {
                return [];
            }
        }
    }
?>
