document.addEventListener('DOMContentLoaded', () => {
    const meetupArea = document.getElementById('meetupArea');
    const chatBox = document.getElementById('chatBox');
    const usernameInput = document.getElementById('usernameInput');
    const chatInput = document.getElementById('chatInput');

    let username = localStorage.getItem('username');
    if (username) {
        usernameInput.value = username;
        usernameInput.disabled = true;
    } else {
        usernameInput.addEventListener('change', () => {
            username = usernameInput.value.trim();
            if (username) {
                localStorage.setItem('username', username);
                usernameInput.disabled = true;
            }
        });
    }

    let cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.left = '50%';
    cube.style.top = '50%';
    meetupArea.appendChild(cube);

    let posX = meetupArea.offsetWidth / 2;
    let posY = meetupArea.offsetHeight / 2;
    let moving = { left: false, up: false, right: false, down: false };

    function moveCube() {
        if (moving.up && posY > 0) posY -= 2;
        if (moving.down && posY < meetupArea.offsetHeight - cube.offsetHeight) posY += 2;
        if (moving.left && posX > 0) posX -= 2;
        if (moving.right && posX < meetupArea.offsetWidth - cube.offsetWidth) posX += 2;
        cube.style.left = `${posX}px`;
        cube.style.top = `${posY}px`;
        requestAnimationFrame(moveCube);
    }

    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 'w': moving.up = true; break;
            case 'a': moving.left = true; break;
            case 's': moving.down = true; break;
            case 'd': moving.right = true; break;
        }
    });

    document.addEventListener('keyup', (event) => {
        switch (event.key) {
            case 'w': moving.up = false; break;
            case 'a': moving.left = false; break;
            case 's': moving.down = false; break;
            case 'd': moving.right = false; break;
        }
    });

    moveCube();

    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.forEach(message => {
            const chatMessage = document.createElement('div');
            chatMessage.className = 'chat-message';
            chatMessage.textContent = message;
            chatBox.appendChild(chatMessage);
        });
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    function saveMessage(message) {
        const messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.push(message);
        localStorage.setItem('messages', JSON.stringify(messages));
    }

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message && username) {
            const chatMessage = document.createElement('div');
            chatMessage.className = 'chat-message';
            chatMessage.textContent = `${username}: ${message}`;
            chatBox.appendChild(chatMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            chatInput.value = '';
            saveMessage(chatMessage.textContent);
        }
    }

    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });

    loadMessages();
});
