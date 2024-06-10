document.addEventListener('DOMContentLoaded', () => {
    const meetupArea = document.getElementById('meetupArea');
    const chatBox = document.getElementById('chatBox');
    const chatInput = document.getElementById('chatInput');

    let cube = document.createElement('div');
    cube.className = 'cube';
    cube.style.left = '50%';
    cube.style.top = '50%';
    meetupArea.appendChild(cube);

    let posX = meetupArea.offsetWidth / 2;
    let posY = meetupArea.offsetHeight / 2;

    function moveCube(event) {
        switch (event.key) {
            case 'ArrowUp':
                if (posY > 0) posY -= 5;
                break;
            case 'ArrowDown':
                if (posY < meetupArea.offsetHeight - cube.offsetHeight) posY += 5;
                break;
            case 'ArrowLeft':
                if (posX > 0) posX -= 5;
                break;
            case 'ArrowRight':
                if (posX < meetupArea.offsetWidth - cube.offsetWidth) posX += 5;
                break;
        }
        cube.style.left = `${posX}px`;
        cube.style.top = `${posY}px`;
    }

    document.addEventListener('keydown', moveCube);

    function sendMessage() {
        const message = chatInput.value.trim();
        if (message) {
            const chatMessage = document.createElement('div');
            chatMessage.className = 'chat-message';
            chatMessage.textContent = message;
            chatBox.appendChild(chatMessage);
            chatBox.scrollTop = chatBox.scrollHeight;
            chatInput.value = '';
        }
    }

    chatInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            sendMessage();
        }
    });
});
