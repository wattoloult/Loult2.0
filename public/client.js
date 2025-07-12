const socket = io();
const chatBox = document.getElementById('chat-box');
const input = document.getElementById('msg');
const userList = document.getElementById('user-list');

const pseudo = prompt("Choisis ton pseudo :", "Anonyme#" + Math.floor(Math.random() * 1000));
socket.emit('new-user', pseudo);

function send() {
  const msg = input.value.trim();
  if (msg) {
    socket.emit('message', { pseudo, msg });
    input.value = '';
  }
}

socket.on('message', (data) => {
  const el = document.createElement('p');
  el.innerHTML = `<strong>${data.pseudo} :</strong> ${data.msg}`;
  chatBox.appendChild(el);
  chatBox.scrollTop = chatBox.scrollHeight;
});

socket.on('update-users', (users) => {
  userList.innerHTML = '';
  users.forEach(user => {
    const li = document.createElement('li');
    li.textContent = user;
    userList.appendChild(li);
  });
});
