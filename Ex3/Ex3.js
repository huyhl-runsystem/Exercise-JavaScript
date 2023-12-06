var boldState = false;
var italicState = false;

function sendMessage(side) {
  var messageInput = document.getElementById(side + "Message");
  var message = messageInput.value.trim();

  if (message !== "") {
    var chatbox = document.querySelector("." + side + " .msg");
    var newMessageWrapper = document.createElement("div");
    newMessageWrapper.classList.add("message-wrapper");

    var newMessage = document.createElement("p");
    newMessage.textContent = message;

    var fontStyle = messageInput.style.fontStyle;
    var fontWeight = messageInput.style.fontWeight;

    if (fontStyle) {
      newMessage.style.fontStyle = fontStyle;
    }
    if (fontWeight) {
      newMessage.style.fontWeight = fontWeight;
    }

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
    otherNewMessage.textContent = "Received: " + message;

    if (fontStyle) {
      otherNewMessage.style.fontStyle = fontStyle;
    }
    if (fontWeight) {
      otherNewMessage.style.fontWeight = fontWeight;
    }

    if (otherSide === "left" || otherSide === "right") {
      otherNewMessage.classList.add("received");
    }

    otherNewMessageWrapper.appendChild(otherNewMessage);
    otherChatbox.appendChild(otherNewMessageWrapper);
  }
}

function applyItalic(style, side) {
  var messageInput = document.getElementById(side + "Message");
  italicState = !italicState;
  messageInput.style.fontStyle = italicState ? style : "";
}
function applyBold(style, side) {
  var messageInput = document.getElementById(side + "Message");
  boldState = !boldState;
  messageInput.style.fontWeight = boldState ? style : "";
}

function resetInput(side) {
  var messageInput = document.getElementById(side + "Message");
  messageInput.value = "";
}
