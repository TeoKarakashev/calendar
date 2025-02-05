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

        public function getInterestsForPresentation($data) {
            $result = $this->presentationInterestsRepository->getInterestsForPresentation($data);

            if($result['success']) {
                $interestsData = $result['data']->fetchAll(PDO::FETCH_COLUMN);
                return $interestsData;
            } else {
                return [];
            }
        }

        public function addPresentationInterest($data) {
            return $this->presentationInterestsRepository->addPresentationInterest($data);
        }

        public function deletePresentationInterest($data) {
            return $this->presentationInterestsRepository->deletePresentationInterest($data);
        }
    }
?>
