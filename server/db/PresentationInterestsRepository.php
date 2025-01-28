<?php
    class PresentationInterestsRepository {
        private $connection;
        private $getPresentationInterests;
    

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
        }

        public function getPresentationInterests() {
            try {
                $this->getPresentationInterests->execute();

                return ['success' => true, 'data' => $this->getPresentationInterests];
            } catch (PDOException $e) {
                return ['success' => false, 'error' => $e->getMessage()];
            }
        }
    }

?>
