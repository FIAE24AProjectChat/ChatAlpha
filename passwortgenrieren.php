<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);
  $email = $data['email'];
  $username = $data['username'];
  $password = password_hash($data['password'], PASSWORD_BCRYPT);
  
  // Datenbankverbindung herstellen
  $conn = new mysqli('localhost', 'root', '', 'your_database');
  
  if ($conn->connect_error) {
    echo json_encode(['success' => false, 'error' => 'Datenbankverbindung fehlgeschlagen']);
    exit();
  }
  
  // Benutzer in die Datenbank eintragen
  $stmt = $conn->prepare('INSERT INTO users (email, username, password) VALUES (?, ?, ?)');
  $stmt->bind_param('sss', $email, $username, $password);
  
  if ($stmt->execute()) {
    // Bestätigungsmail senden
    mail($email, 'Registrierung erfolgreich', 'Willkommen, ' . $username . '! Ihre Registrierung war erfolgreich.');
    echo json_encode(['success' => true]);
  } else {
    echo json_encode(['success' => false, 'error' => 'Fehler beim Eintragen in die Datenbank']);
  }
  
  $stmt->close();
  $conn->close();
}
?>
