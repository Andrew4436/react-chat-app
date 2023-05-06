import React, { useRef } from "react";
import "../styles/Home.css";

function Home({ user, socket }) {
  const currentUser = user;
  const messageRef = useRef();

  var dateObj = new Date();
  let hour = dateObj.getHours().toString();
  let min = dateObj.getMinutes().toString();
  if (min.length === 1) {
    min = "0" + min;
  }
  if (hour.length === 1) {
    hour = "0" + hour;
  }
  if (+hour > 12) {
    hour = (+hour - 12).toString();
  }
  const newdate = `${hour}:${min}`;

  socket.off("receive-message").on("receive-message", (message, user) => {
    displayMessage(message, user);
  });

  function sendMessage(e, message, user) {
    e.preventDefault();
    messageRef.current.value = "";
    socket.emit("send-message", message, user);

    displayMessage(message, user);
  }

  function displayMessage(message, user) {
    if (currentUser) {
      const textarea = document.querySelector("#textarea");
      const newMsg = document.createElement("div");
      if (currentUser.username === user.username) {
        newMsg.classList.add("msg");
      } else {
        newMsg.classList.add("others-msg");
      }

      newMsg.innerHTML = `<div class="inner-msg">
                <h1 class="inner-msg-message">${message}</h1>
                <div class="inner-msg-info">
                    <p class="date">${newdate}</p>
                    <p class="user">${user.username}</p>
                </div>
            </div>`;

      textarea.appendChild(newMsg);
    }
  }

  return (
    <div id="chat-container">
      <div id="textarea"></div>
      <form
        id="send-msg"
        autoComplete="off"
        onSubmit={(e) => sendMessage(e, messageRef.current.value, user)}
      >
        <input
          ref={messageRef}
          id="msg-input"
          placeholder="type in your message"
          required
        />
        <button id="send-msg-btn">Send</button>
      </form>
    </div>
  );
}

export default Home;
