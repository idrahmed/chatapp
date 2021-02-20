import { Avatar } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";
import { useParams } from "react-router-dom";
import "./chat.css";
import db from "../../firebase";
import { useStateValue } from "../contextapi/StateProvider";
import firebase from "firebase";

function Chat() {
  const [seed, setSeed] = useState("");
  const [text, setText] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const userName = user.displayName.split(" ")[0];
  console.log(messages);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomName(snapshot.data().name));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  function sendMessage(text) {
    db.collection("rooms").doc(roomId).collection("messages").add({
      message: text,
      name: user.displayName,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>

          {messages.length > 0 && (
            <p className="chat-room-last-seen">
              Last message{" "}
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </p>
          )}
        </div>
      </div>

      <div className="chat_body">
        {messages.map((message) => (
          <p
            className={`chat_message ${
              message.name == user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{userName}</span>
            {message.message}
          </p>
        ))}
      </div>
      <div>
        <InputEmoji
          type="text"
          value={text}
          onChange={setText}
          onEnter={sendMessage}
          cleanOnEnter
          placeholder="Type a message"
        />
      </div>
    </div>
  );
}

export default Chat;
