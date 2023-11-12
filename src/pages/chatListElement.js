import React, { useState } from "react";
import mainImage from './image1.png';
import '../styles/chatListElement.css';

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

export default ChatListElement;