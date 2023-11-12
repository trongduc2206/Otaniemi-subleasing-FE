import React, { Component } from "react";
import '../styles/chatMessage.css';

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

export default ChatMessage;