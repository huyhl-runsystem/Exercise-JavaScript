function sendMessage(side) {
  var messageInput = document.getElementById(side + "Message");
  var message = messageInput.value.trim(); // Trim leading and trailing whitespaces

  if (message !== "") {
    var chatbox = document.querySelector("." + side + " .msg");
    var newMessageWrapper = document.createElement("div");
    newMessageWrapper.classList.add("message-wrapper");

    var newMessage = document.createElement("p");
    newMessage.textContent = message;

    if (side === "right" || side === "left") {
      newMessage.classList.add("sent");
    }

    newMessageWrapper.appendChild(newMessage);
    chatbox.appendChild(newMessageWrapper);

    messageInput.value = "";

    var otherSide = side === "left" ? "right" : "left";
    var otherChatbox = document.querySelector("." + otherSide + " .msg");
    var otherNewMessageWrapper = document.createElement("div");
    otherNewMessageWrapper.classList.add("message-wrapper");

    var otherNewMessage = document.createElement("p");
    otherNewMessage.textContent = "Response: " + message;

    if (otherSide === "left" || otherSide === "right") {
      otherNewMessage.classList.add("received");
    }

    otherNewMessageWrapper.appendChild(otherNewMessage);
    otherChatbox.appendChild(otherNewMessageWrapper);
  }
}
