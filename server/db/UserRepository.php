<?php
    class UserRepository {

        private $connection;
        private $insertUser;
        private $selectUser;
        private $selectUserWithInterests;
        private $deleteInterestsForUser;
        private $addInterestsForUser;


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
            $sql = "SELECT * FROM users WHERE username = :username";
            $this->selectUser = $this->connection->prepare($sql);

            $sql = "INSERT INTO users(first_name, last_name, username, password) VALUES
                    (:firstName, :lastName, :username, :password)";
            $this->insertUser = $this->connection->prepare($sql);

            $sql = "SELECT users.username, users.first_name, users.last_name, users.password ,user_interests.interest 
                    FROM users JOIN user_interests ON users.username = user_interests.username
                    WHERE users.username = :username";
            $this->selectUserWithInterests = $this->connection->prepare($sql);

            $sql = "DELETE FROM user_interests WHERE username = :username";
            $this->deleteInterestsForUser = $this->connection->prepare($sql);

            $sql = "
                INSERT INTO user_interests(username, interest) VALUES
                (:username, :interest)";
            $this->addInterestsForUser = $this->connection->prepare($sql);
        }
       

        public function selectUserQuery($data) {
            try {
                $this->selectUser->execute($data);

                return ["success" => true, "data" => $this->selectUser];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }
        
        public function insertUserQuery($data) {
            try {
                $this->insertUser->execute($data);
                return ["success" => true];
            } catch (PDOException $e) {
                $this->connection->rollBack();
                return ["success" => false, "error" => "Connection failed: " . $e->getMessage()];
            }
        }

        public function getUserWithInterestsByUsername($data) {
            try {
                $this->selectUserWithInterests->execute($data);

                return ["success" => true, "data" => $this->selectUserWithInterests];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        public function deleteInterestsForUserQuery($data) {
            try {
                $this->deleteInterestsForUser->execute($data);
                return ["success" => true];
            } catch (PDOException $e) {
                $this->connection->rollBack();
                return ["success"=> false, "error" => $e->getMessage()];
            }
        }

        public function addInterestsForUserQuery($data) {
            try {
                //for each interest in data, execute the query
                for ($i = 0; $i < count($data); $i++) {
                    $this->addInterestsForUser->execute($data[$i]);
                }
                return ["success" => true];
            } catch (PDOException $e) {
                $this->connection->rollBack();
                return ["success" => false, "error" => $e->getMessage()];
            }
        }


        function __destruct() {
            $this->connection = null;
        }
    }
?>
