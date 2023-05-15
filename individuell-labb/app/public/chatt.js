var socket = io();

const btnSend = document.querySelector('#send');

btnSend.addEventListener('click', () => {
    const input = document.querySelector('#input');
    socket.emit('chatt message', input.value);
});

socket.on('chatt message', (message) => {
    const messageBox = document.querySelector('.chatt-message-box');
    messageBox.innerHTML += `<div class="chatt-message">${message}</div>`;
});

socket.on('server message', (message) => {
    const messageBox = document.querySelector('.chatt-message-box');
    messageBox.innerHTML += `<div class="chatt-message">${message}</div>`;
});
