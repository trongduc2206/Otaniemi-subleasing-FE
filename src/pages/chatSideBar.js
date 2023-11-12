import React, { useState } from "react";
import ChatListElement from "./chatListElement";
import { hover } from "@testing-library/user-event/dist/hover";

var messageCount = 5;

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

export default ChatSidebar;