<?php
    include '../db/PresentationEventsRepository.php';

    class PresentationEventService {
        private $presentationEventsRepository;

        public function __construct() {
            $this->presentationEventsRepository = new PresentationEventsRepository();
        }

        public function getEvents() {
            $result = $this->presentationEventsRepository->getPresentationEvents();
            if ($result['success']) {
                $events = $result['data']->fetchAll(PDO::FETCH_ASSOC);
                return $events;
            } else {
                return [];
            }
        }

        public function addEvent($presentation_title, $presenter, $date) {
            return $this->presentationEventsRepository->addPresentationEvent($presentation_title, $presenter, $date);
        }

        public function deleteEvent($presentation_title, $presenter) {
            return $this->presentationEventsRepository->deletePresentationEvent($presentation_title, $presenter);
        }
    }   
?>