const socket = io();
const chatform = document.querySelector("#chatform");
const messagebox = document.querySelector("#messagebox");
const messagecontainer = document.querySelector("#message-container");

let room;

// document.querySelector("#micButton").addEventListener("click", toggleAudio);
// document.querySelector("#cameraButton").addEventListener("click", toggleVideo);

socket.emit("joinroom");

socket.on("joined", function (roomname) {
  room = roomname;
  document.querySelector(".nobody").classList.add("hidden");
});

socket.on("message", function (message) {
  receiveMessage(message);
});

chatform.addEventListener("submit", function (event) {
  event.preventDefault();
  socket.emit("message", { room, message: messagebox.value });
  attachMessage(messagebox.value);
  messagebox.value = "";
});

function attachMessage(message) {
  const userMessageContainer = document.createElement("div");
  userMessageContainer.classList.add("flex", "my-2", "justify-end");

  const userMessageDiv = document.createElement("div");
  userMessageDiv.classList.add(
    "bg-blue-500",
    "text-white",
    "p-3",
    "rounded-lg",
    "max-w-xs"
  );

  const userMessageText = document.createElement("p");
  userMessageText.textContent = message;

  userMessageDiv.appendChild(userMessageText);

  userMessageContainer.appendChild(userMessageDiv);

  document
    .getElementById("message-container")
    .appendChild(userMessageContainer);

  document.querySelector("#message-container").scrollTop =
    document.querySelector("#message-container").scrollHeight;
}

function receiveMessage(message) {
  const messageContainer = document.createElement("div");
  messageContainer.classList.add("flex", "my-2", "justify-start");

  const messageDiv = document.createElement("div");
  messageDiv.classList.add(
    "bg-gray-300",
    "text-gray-800",
    "p-3",
    "rounded-lg",
    "max-w-xs"
  );

  const messageText = document.createElement("p");
  messageText.textContent = message;

  messageDiv.appendChild(messageText);

  messageContainer.appendChild(messageDiv);

  document.getElementById("message-container").appendChild(messageContainer);
  document.querySelector("#message-container").scrollTop =
    document.querySelector("#message-container").scrollHeight;
}
