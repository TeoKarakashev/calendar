<?php
    class PresentationRepository {
        private $connection;
        private $createPresentation;
        private $getAllPresentations;
        private $getAllUntakenRecommendedPresentations;
        private $getAllUntakenPresentations;
        private $removeUserFromPresentation;
        private $addUserToPresentation;
        private $getPresentationForUser;
        private $deletePresentation;
        private $updatePresentationTitle;


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
            $sql = "INSERT INTO presentations (title)
                    VALUES (:presentation)";
            $this->createPresentation = $this->connection->prepare($sql);

            $sql = "SELECT *
                FROM presentations";
            $this->getAllPresentations = $this->connection->prepare($sql);

            $sql = "SELECT p.title
                FROM presentations p
                JOIN presentation_interests pi ON p.title = pi.title
                JOIN user_interests ui ON pi.interest = ui.interest
                JOIN users u ON ui.username = u.username
                WHERE u.username = :username 
                AND p.is_taken = FALSE";
            $this->getAllUntakenRecommendedPresentations = $this->connection->prepare($sql);

            $sql ="SELECT title
                    FROM presentations
                    WHERE is_taken = FALSE;";
            $this->getAllUntakenPresentations = $this->connection->prepare($sql);

            $sql = "UPDATE presentations
                    SET username = NULL, is_taken = FALSE
                    WHERE username = :username;";
            $this->removeUserFromPresentation = $this->connection->prepare($sql);

            $sql = "UPDATE presentations
                    SET username = :username, is_taken = TRUE
                    WHERE title = :presentation;";
            $this->addUserToPresentation = $this->connection->prepare($sql);

            $sql = "SELECT title
                    FROM presentations
                    WHERE username = :username;";
            $this->getPresentationForUser = $this->connection->prepare($sql);

            $sql = "DELETE FROM presentations
                    WHERE title = :title";
            $this->deletePresentation = $this->connection->prepare($sql);

            $sql = "UPDATE presentations
                    SET title = :title
                    WHERE title = :originalTitle";
            $this->updatePresentationTitle = $this->connection->prepare($sql);
        }
        
        public function createPresentation($data) {
            try {
                $this->createPresentation->execute($data);
                
                return ["success" => true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function getAllPresentations() {
            try {
                $this->getAllPresentations->execute();
                
                return ["success" => true, "data" => $this->getAllPresentations];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function getAllUntakenRecommendedPresentationsQuery($data) {
            try {
                $this->getAllUntakenRecommendedPresentations->execute($data);

                return ["success" => true, "data" => $this->getAllUntakenRecommendedPresentations];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function getAllUntakenPresentationsQuery() {
            try {
                $this->getAllUntakenPresentations->execute();

                return ["success" => true, "data" => $this->getAllUntakenPresentations];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function removeUserFromPresentationQuery($data) {
            try {
                $this->removeUserFromPresentation->execute($data);

                return ["success" => true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function updatePresentationQuery($data) {
            try {
                $this->addUserToPresentation->execute($data);
                return ["success"=> true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function getPresentationForUserQuery($data) {
            try {
                $this->getPresentationForUser->execute($data);

                return ["success" => true, "data" => $this->getPresentationForUser];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function updatePresentationTitle($data) {
            try {
                $this->updatePresentationTitle->execute($data);
                return ["success"=> true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function deletePresentation($data) {
            try {
                $this->deletePresentation->execute($data);
                return ["success"=> true];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        function __destruct() {
            $this->connection = null;
        }
    }
?>
