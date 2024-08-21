const socket = io();
const chatform = document.querySelector("#chatform");
const messagebox = document.querySelector("#messagebox");
const messagecontainer = document.querySelector("#message-container");

let room;

document.querySelector("#micButton").addEventListener("click", toggleAudio);
document.querySelector("#cameraButton").addEventListener("click", toggleVideo);

socket.emit("joinroom");
