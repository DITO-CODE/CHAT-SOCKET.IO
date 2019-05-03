const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click',()=>{
    let data ={
        username: username.value,
        message:  message.value
    }
   socket.emit('chat:message',data);
});

message.addEventListener('keypress',()=>{
    socket.emit('chat:typing',username.value);
});

socket.on('chat:message',(data)=>{
    actions.innerHTML = '';
    output.innerHTML += 
        `<p>
        <strong>${data.username}</strong> : ${data.message}
        </p>`;
});

socket.on('chat:typing',(data)=>{
    actions.innerHTML = `<p>${data} esta escribiendo</p>`
});
