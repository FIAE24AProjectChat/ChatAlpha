document.addEventListener('DOMContentLoaded', () => {
    const emojiButton = document.getElementById('emoji-button');
    const emojiPicker = document.getElementById('emoji-picker');
    const messageInput = document.getElementById('message-input');

    const emojis = ['😊', '😂', '😍', '😢', '😎', '👍', '🙏', '🎉'];

    emojiButton.addEventListener('click', () => {
        emojiPicker.style.display = emojiPicker.style.display === 'none' ? 'block' : 'none';
    });

    emojis.forEach(emoji => {
        const emojiElement = document.createElement('span');
        emojiElement.textContent = emoji;
        emojiElement.classList.add('emoji');
        emojiElement.addEventListener('click', () => {
            messageInput.value += emoji;
            emojiPicker.style.display = 'none';
        });
        emojiPicker.appendChild(emojiElement);
    });
});

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const progressWheel = document.getElementById('progressWheel');
    const message = document.getElementById('message');
    
    if (!validateEmail(email)) {
      message.textContent = 'Ungültiges E-Mail-Format';
      return;
    }
    
    if (!validateUsername(username)) {
      message.textContent = 'Ungültiges Benutzername-Format';
      return;
    }
    
    progressWheel.style.display = 'block';
    
    // Passwort generieren
    const password = generatePassword();
    
    // Daten an den Server senden
    fetch('register.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, username, password })
    })
    .then(response => response.json())
    .then(data => {
      progressWheel.style.display = 'none';
      if (data.success) {
        message.textContent = 'Registrierung erfolgreich! Bestätigungsmail wurde gesendet.';
      } else {
        message.textContent = 'Fehler bei der Registrierung: ' + data.error;
      }
    });
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validateUsername(username) {
    const re = /^[a-zA-Z0-9_]{3,16}$/;
    return re.test(username);
  }
  
  function generatePassword() {
    return Math.random().toString(36).slice(-8);
  }


  
  