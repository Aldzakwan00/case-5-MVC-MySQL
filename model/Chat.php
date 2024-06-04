<?php
class Chat {
    private $conn;

    public function __construct() {
        $host = 'localhost';
        $user = 'root';
        $pass = 'aldzaqwan';
        $dbname = 'chat-mvc';

        $this->conn = new mysqli($host, $user, $pass, $dbname);

        if ($this->conn->connect_error) {
            die('Connection failed: ' . $this->conn->connect_error);
        }
    }

    public function saveMessage($username, $message) {
        $sql = "INSERT INTO pesan (user, isi_pesan, waktu) VALUES (?, ?, ?)";
        $stmt = $this->conn->prepare($sql);
        $timestamp = date('Y-m-d H:i:s');
        $stmt->bind_param('sss', $username, $message, $timestamp);
        $stmt->execute();
        $stmt->close();
    }

    public function getMessages() {
        $sql = "SELECT user AS username, isi_pesan AS message, waktu AS timestamp FROM pesan ORDER BY waktu ASC";
        $result = $this->conn->query($sql);

        $messages = [];
        while ($row = $result->fetch_assoc()) {
            $messages[] = $row;
        }

        return $messages;
    }

    public function __destruct() {
        $this->conn->close();
    }
}
