<?php
    require_once __DIR__ . '/../model/Chat.php';

    class Controller {
        private $model;

        public function __construct() {
            $this->model = new Chat();
        }

        public function handleRequest() {
            if ($_SERVER["REQUEST_METHOD"] === "POST") {
                $this->postMessage();
            } else {
                $this->getMessages();
            }
        }

        private function postMessage() {
            $username = $_POST['user'] ?? '';
            $message = $_POST['pesan'] ?? '';
            if ($this->model->saveMessage($username, $message)) {
                echo json_encode(['status' => 'success']);
            } else {
                echo json_encode(['status' => 'error']);
            }
        }

        private function getMessages() {
            $messages = $this->model->getMessages();
            header('Content-Type: application/json');
            echo json_encode($messages);
        }
    }

    $controller = new Controller();
    $controller->handleRequest();
