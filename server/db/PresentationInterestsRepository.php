<?php
    class PresentationInterestsRepository {
        private $connection;
        private $getPresentationInterests;
        private $getInterestsForPresentation;
        private $addPresentationInterest;
        private $deletePresentationInterest;
    

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
            $sql = "SELECT * FROM presentation_interests";
            $this->getPresentationInterests = $this->connection->prepare($sql);

            $sql = "SELECT interest FROM presentation_interests
                    WHERE title = :presentation";
            $this->getInterestsForPresentation = $this->connection->prepare($sql);

            $sql = "INSERT INTO presentation_interests
                    VALUES (:presentation, :interest)";
            $this->addPresentationInterest = $this->connection->prepare($sql);

            $sql = "DELETE FROM presentation_interests
                    WHERE title = :presentation AND interest = :interest";
            $this->deletePresentationInterest = $this->connection->prepare($sql);
        }

        public function getPresentationInterests() {
            try {
                $this->getPresentationInterests->execute();

                return ['success' => true, 'data' => $this->getPresentationInterests];
            } catch (PDOException $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        public function getInterestsForPresentation($data) {
            try {
                $this->getInterestsForPresentation->execute($data);

                return ['success' => true, 'data' => $this->getInterestsForPresentation];
            } catch (PDOException $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        public function addPresentationInterest($data) {
            try {
                $this->addPresentationInterest->execute($data);

                return ['success' => true];
            } catch (PDOException $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }

        public function deletePresentationInterest($data) {
            try {
                $this->deletePresentationInterest->execute($data);

                return ['success' => true];
            } catch (PDOException $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }
    }

?>
