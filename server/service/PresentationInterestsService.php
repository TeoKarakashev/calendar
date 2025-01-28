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
                $presentationInterestsData = $result['data']->fetchAll(PDO::FETCH_ASSOC);
                $presentationInterests = [];
                foreach ($presentationInterestsData as $presInterest) {
                    $presentationInterests[] = [
                        'title' => $presInterest['title'],
                        'interest' => $presInterest['interest']
                    ];
                }
                return $presentationInterests;
            } else {
                return [];
            }
        }
    }
?>
