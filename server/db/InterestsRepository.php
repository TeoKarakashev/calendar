<?php
    class InterestsRepository {
        private $connection;
        private $getAllInterests;


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
            $sql = "SELECT name FROM interests";
            $this->getAllInterests = $this->connection->prepare($sql);
        }
       

        public function getAllInterests() {
            try {
                $this->getAllInterests->execute();

                return ["success" => true, "data" => $this->getAllInterests];
            } catch (PDOException $e) {
                return ["success" => false, "error" => $e->getMessage()];
            }
        }

        function __destruct() {
            $this->connection = null;
        }
    }
?>
