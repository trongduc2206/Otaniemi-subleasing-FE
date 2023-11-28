import React, { Component, useState } from "react";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {RequestGet, RequestPost} from './services/apiRequest.js';
import axios from "axios";
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
                        {this.props.sender.charAt(0)}
                    </div>
                    <div class="nameAndMessage">
                        <div class="name">
                            {this.props.sender}
                        </div>
                        <div class="message">
                            {this.props.content}
                        </div>
                    </div>
                </div>
                <div class="timeStamp">
                </div>
            </div>
        </>
        );
    }
}

const ChatListElement = ({ chatId, sender, selected, onSelect, unreadMessages }) => {
    return (
        <div className={`chatListElement ${selected ? 'selected' : ''}`} onClick={onSelect}>
            <div className="picture">
                <img src={mainImage} width="138px" height="92px" />
            </div>
            <div className="content">
                <div className="apartmentInfo">
                    <div className="location">{sender}</div>
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

const ChatSidebar = (props) => {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatSelect = (chatId, contact) => {
        setSelectedChat(chatId);
        props.handleItemClick(contact);
    };

    return (
        <div>
            {props.contacts.map((contact, index) => (
                <ChatListElement 
                key={index} 
                chatId={index} 
                sender={contact}
                // unreadMessages={selectedChat === index ? 0 : chat.unreadMessages} 
                selected={index === selectedChat} 
                onSelect={() => handleChatSelect(index, contact)} />
            ))}
        </div>
    );
};

class Chat extends Component {
    webSocketEndPoint = 'https://subleasing-be.victoriousdesert-96ff8f6f.northeurope.azurecontainerapps.io/ws';
    stompClient;
    constructor(props) {
        super(props);
        // Initial state
        this.state = {
            username: "",
            messageText: '',
            messages:[],
            contacts: [],
            chatWith: '',
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        event.preventDefault();
        const target = event.target;
        this.setState({[target.name]: target.value});
      }
    
    
    async componentDidMount() {
        // Make the API call when the component mounts
        window.scrollTo(0,0);
        if(localStorage.getItem("user")) {
            const user = JSON.parse(localStorage.getItem("user"))
            let username = user.username;
            console.log(user)
            let contacts = await RequestGet(`/api/chat/contact/${user.id}`)
            if(localStorage.getItem("contactUser") && !contacts.includes(JSON.parse(localStorage.getItem("contactUser")))){
                contacts = contacts.concat([JSON.parse(localStorage.getItem("contactUser"))])
            }
            console.log(contacts)
            this.setState({username, contacts})
        }
    }

    onMessageReceived = (message) => {
        const messages = this.state.messages
        console.log("received message -> " + message.body)
        const newMessage = JSON.parse(message.body)
        console.log(newMessage)
        messages.push(newMessage)
        this.setState((prevState) => ({
            ...prevState,
            messages: messages, // Update only field2
        }));
    }

    handleItemClick = async (contact) => {
        console.log(contact)
        this.setState((prevState) => ({
            ...prevState,
            chatWith: contact,
        }));

        const {messages, topicName} = await RequestGet("/api/chat/messages", {sender: this.state.username, receiver: contact})
        this.setState((prevState) => ({
            ...prevState,
            messages: messages, // Update only field2
        }));
            console.log("Initialize WebSocket Connection");
            let ws = new SockJS(this.webSocketEndPoint);
            this.stompClient = Stomp.over(ws);
            const _this = this;
            _this.stompClient.connect({}, function (frame) {
                _this.stompClient.subscribe(topicName, function (sdkEvent) {
                    _this.onMessageReceived(sdkEvent);
                });
            }, this.errorCallBack);

    }

    handleButtonClick = async () => {
        // Do something with the input value (e.g., log it to the console)
        console.log('Input value:', this.state.messageText);
        if(localStorage.getItem("auth")) {
            let user = JSON.parse(localStorage.getItem("user"))
            console.log(user.username)
            let message = {
                sender: user.username,
                receiver: this.state.chatWith,
                content: this.state.messageText,
            }
            console.log("message, response:", message)
            const response = await RequestPost("/api/chat/send", message)
            console.log("message, response:", message, response);
          }
    };

    render() {
      return (
        <>
            <Header className="Header"/>
            <div class="chatPageMainContainer">
                <aside class="sideBar">
                        <ChatSidebar 
                            handleItemClick={this.handleItemClick}
                            contacts={this.state.contacts}/>
                </aside>
                <div class="chatContainer">
                    <div class="chatWindow">
                        {this.state.messages.map((message, index) => (
                            <ChatMessage
                            key={index}
                            sender={message.senderUsername} 
                            content={message.content} 
                            sentTime={message.sentTime} />
                        ))}
                    </div>
                    <div class="chatInputContainer">
                        <IconButton variant="attachment" />
                        <input class="messageInput" type="text" placeholder="Write a message..." name="messageText" onChange={this.handleChange}></input>
                        <IconButton variant="send" onSend={this.handleButtonClick}/>
                    </div>
                </div>
            </div>
        </>
        );
    }
}

export default Chat;