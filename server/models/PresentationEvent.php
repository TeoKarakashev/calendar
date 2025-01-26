<?php

class PresentationEvent {
    private $presentation_title;
    private $presenter;
    private $date;

    public function __construct($presentation_title, $presenter, $date) {
        $this->presentation_title = $presentation_title;
        $this->presenter = $presenter;
        $this->date = $date;
    }

    public function getPresentationTitle() {
        return $this->presentation_title;
    }

    public function getPresenter() {
        return $this->presenter;
    }

    public function getDate() {
        return $this->date;
    }
}
?>
