<?php
    class PresentationEventsRepository {
        private $connection;
        private $getPresentationEvents;
        private $addPresentationEvent;
        private $deletePresentationEvent;

        public function __construct() {
            $config = parse_ini_file('../../config.ini', true);

            $type = $config['db']['db_type'];
            $host = $config['db']['host'];
            $port = $config['db']['port'];
            $name = $config['db']['db_name'];
            $user = $config['db']['user'];
            $password = $config['db']['password'];

            $this->init($type, $host, $port, $name, $user, $password);
        }

        private function init($type, $host, $port, $name, $user, $password) {
            try {
                $this->connection = new PDO("$type:host=$host;port=$port;dbname=$name", $user, $password);

                $this->prepareStatements();
            } catch (PDOException $e) {
                echo "Connection failed: " . $e->getMessage();
            }
        }

        private function prepareStatements() {
            $sql = "SELECT presentation_title, presenter, date
                    FROM presentation_events";
            $this->getPresentationEvents = $this->connection->prepare($sql);

            $sql = "INSERT INTO presentation_events (presentation_title, presenter, date)
            VALUES (:presentation_title, :presenter, :date)
            ";
            $this->addPresentationEvent = $this->connection->prepare($sql);

            $sql = "DELETE FROM presentation_events
                    WHERE presentation_title = :presentation_title
                          AND presenter = :presenter";
            $this->deletePresentationEvent = $this->connection->prepare($sql);
        }
        

        public function getPresentationEvents() {
            try {
                $this->getPresentationEvents->execute();

                return ["success" => true, "data" => $this->getPresentationEvents];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function addPresentationEvent($presentation_title, $presenter, $date) {
            try {
                $this->addPresentationEvent->execute(["presentation_title" => $presentation_title,
                                                      "presenter" => $presenter,
                                                      "date" => $date]);
                return ["success" => true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function deletePresentationEvent($presentation_title, $presenter) {
            try {
                $this->deletePresentationEvent->execute(["presentation_title" => $presentation_title,
                                                         "presenter" => $presenter]);
                return ["success" => true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
    }
?>
