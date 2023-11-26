import React, { Component, useState } from "react";
import Header from "../Header";
import IconButton from "./createOffer/iconButton";
import mainImage from '../styles/img//image1.png';
import '../styles/chatMessage.css';
import '../styles/chatListElement.css';
import '../styles/chatPage.css';

var messageCount = 5;

class ChatMessage extends Component {
    render() {
      return (
        <>
            <div class="chatMessageContainer">
                <div class="messageContent">
                    <div class="profileIcon">
                        S
                    </div>
                    <div class="nameAndMessage">
                        <div class="name">
                            Sampsa Runila
                        </div>
                        <div class="message">
                            Hi! I would be interested, could I come and see the apartment?
                        </div>
                    </div>
                </div>
                <div class="timeStamp">
                    12:43
                </div>
            </div>
        </>
        );
    }
}

const ChatListElement = ({ chatId, selected, onSelect, unreadMessages }) => {
    return (
        <div className={`chatListElement ${selected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="picture">
                <img src={mainImage} width="138px" height="92px" />
            </div>
            <div className="content">
                <div className="apartmentInfo">
                    <div className="location">Otaniemi, Espoo</div>
                    <div className="address">Servin Maijan Tie 3</div>
                    <div className="type">Studio, 24 m2</div>
                </div>
                <div> {selected ? null : (
                    <div className={`notificationBubble ${unreadMessages > 0 ? 'visible' : ''}`}>
                    {unreadMessages}
                    </div>
                )}
                </div>
            </div>
        </div>
    );
};

const ChatSidebar = () => {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatSelect = (chatId) => {setSelectedChat
    (chatId);};

    const chatMenu = [
        { chatId: '1', unreadMessages: 0 },
        { chatId: '2', unreadMessages: messageCount }
    ];

    return (
        <div>
            {chatMenu.map((chat) => (
                <ChatListElement key={chat.chatId} chatId={chat.chatId} unreadMessages={selectedChat === chat.chatId ? 0 : chat.unreadMessages} selected={chat.chatId === selectedChat} onSelect={() => handleChatSelect(chat.chatId)} />
            ))}
        </div>
    );
};

class Chat extends Component {
    render() {
        window.scrollTo(0,0);
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