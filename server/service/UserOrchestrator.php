<?php
    require_once "../db/UserRepository.php";

    class User {

        private $firstName;
        private $lastName;
        private $username;
        private $password;
        private $interests;

        private $userRepository;

        public function __construct($username, $password, $firstName='', $lastName='', $interests = []) {
            $this->firstName = $firstName;
            $this->lastName = $lastName;
            $this->username = $username;
            $this->password = $password;
            $this->interests = $interests;

            $this->userRepository = new UserRepository();
        }

        public function getFirstName() {
            return $this->firstName;
        }

        public function getLastName() {
            return $this->lastName;
        }

        public function getUsername() {
            return $this->username;
        }

        public function getPassword() {
            return $this->password;
        }

        public function getInterests() {
            return $this->interests;
        }

        public function exists() {
            $selectUser = $this->userRepository->selectUserQuery(['username' => $this->username]);

            if ($selectUser['success']) {
                $userData = $selectUser['data']->fetch(PDO::FETCH_ASSOC);

                if ($userData) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

       public function login() {
        $selectUser = $this->userRepository->selectUserQuery(['username' => $this->username]);

            if ($selectUser['success']) {
                $userData = $selectUser['data']->fetch(PDO::FETCH_ASSOC);

                if ($userData && password_verify($this->password, $userData['password'])) {
                    $this->firstName = $userData['first_name'];
                    $this->lastName = $userData['last_name'];
                    return true;
                } else {
                    return false;
                }

            } else {
                return false;
            }
        }

        public function createUser($firstName, $lastName, $username, $passwordHash) {
            $query = $this->userRepository->insertUserQuery([
                'firstName' => $firstName,
                'lastName' => $lastName,
                'username' => $username,
                'password' => $passwordHash]);

            if ($query['success']) {
                $this->firstName = $firstName;
                $this->lastName = $lastName;
                $this->username = $username;
                $this->password = $passwordHash;
            }
        }

        public function getUserWithInterests() {
            $selectUser = $this->userRepository->selectUserQuery(['username' => $this->username]);
            if ($selectUser['success']) {
                $userData = $selectUser['data']->fetch(PDO::FETCH_ASSOC);
                $this->firstName = $userData['first_name'];
                $this->lastName = $userData['last_name'];
                $this->username = $userData['username'];
                $this->password = $userData['password'];

                $userWithInterests = $this->userRepository->getUserWithInterestsByUsername(['username' => $this->username]);
                if($userWithInterests['success']) {
                    $userData = $userWithInterests['data']->fetchAll(PDO::FETCH_ASSOC);
                    $this->interests = array_column($userData, 'interest');
                } else {
                    $this->interests = [];
                }
                return true;
            }
            return false;
        }

        public function removeInterestsForUser($username) {
            $query = $this->userRepository->deleteInterestsForUserQuery(['username' => $username]);
            return $query['success'];
        }

        public function addInterestsForUser($username, $interests) {
            $data = [];
            $interestArray = explode(',', $interests);
            foreach ($interestArray as $interest) {
                $data[] = ['username' => $username, 'interest' => $interest];
            }
            $query = $this->userRepository->addInterestsForUserQuery($data);
            return $query['success'];
        }
    }
?>