import React, { Component } from "react";
import Header from "../Header";
import ChatSidebar from "./chatSideBar";
import ChatMessage from "../pages/chatMessage"
import IconButton from "./iconButton";
import '../styles/chatPage.css';

class Chat extends Component {
    render() {
      return (
        <>
            <Header className="Header"/>
            <div class="chatPageMainContainer">
                <aside class="sideBar">
                    <ChatSidebar />
                </aside>
                <div class="chatContainer">
                    <div class="chatWindow">
                        <ChatMessage />
                    </div>
                    <div class="chatInputContainer">
                        <IconButton variant="attachment" />
                        <input class="messageInput" type="text" placeholder="Write a message..."></input>
                        <IconButton variant="send" />
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default Chat;