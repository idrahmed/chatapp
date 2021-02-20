import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar } from "@material-ui/core";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import SidebarChat from "../sidebarChat/SidebarChat";
import db from "../../firebase";
import { useStateValue } from "../contextapi/StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{user}, dispatch] = useStateValue()

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return () => {
        unsubscribe()
    }
  }, []);

  const createChat = () => {
    const roomName = prompt('Enter a name for chat')
    if (roomName) {
      db.collection('rooms').add({
          name: roomName
      })
    }
}

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar src={user?.photoURL} />
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlinedIcon />
          <input placeholder="Search for a chat" type="text" />
        </div>
      </div>
      <div onClick={createChat} className="add_chat">
      <h3 className="add-new-chat-title">Add New Chat</h3>
    </div>
      <div className="sidebar_chats">
        {rooms.map((room) => (
          <SidebarChat id={room.id} key={room.id} name={room.data.name} />
        ))}
      </div>
      
    </div>
  );
}

export default Sidebar;
