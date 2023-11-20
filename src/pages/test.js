import {Component} from "react";
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import axios from "axios";
class Test extends Component {
    webSocketEndPoint = 'http://localhost:8080/ws';
    topic = "/topic/ducvu-roman";
    stompClient;
    constructor(props) {
        super(props);

        // Initial state
        this.state = {
            inputValue: '',
            messages:[],
            contacts: [],
            chatWith: '',
        };



    }

    componentDidMount() {
        // Make the API call when the component mounts
        if(localStorage.getItem("user")) {
            let userId = JSON.parse(localStorage.getItem("user")).id
            console.log(userId)
            axios.get("http://localhost:8080/api/chat/contact/" + userId).then(
                (response) => {
                    console.log(response.data.data)
                    this.setState({
                        inputValue: '',
                        messages:[],
                        contacts: response.data.data,
                        chatWith: '',
                    })
                }
            )
        }
    }


    handleInputChange = (event) => {
        this.setState({ inputValue: event.target.value });
    };

    handleButtonClick = () => {
        // Do something with the input value (e.g., log it to the console)
        console.log('Input value:', this.state.inputValue);
        if(localStorage.getItem("auth")) {
            let user = JSON.parse(localStorage.getItem("user"))
            console.log(user.username)
            let message = {
                sender: user.username,
                receiver: this.state.chatWith,
                content: this.state.inputValue
            }
            axios.post("http://localhost:8080/api/chat/send",message).then(
                (res) => {

                }
            )
        }


    };

    onMessageReceived = (message) => {
        let current_messages = this.state.messages
        console.log("received message -> " + message.body)
        let new_message = JSON.parse(message.body)
        console.log(new_message)
        current_messages.push(new_message)
        this.setState((prevState) => ({
            ...prevState,
            messages: current_messages, // Update only field2
        }));

    }

    handleItemClick = (contact) => {
        console.log(contact)
        this.setState((prevState) => ({
            ...prevState,
            chatWith: contact,
        }));

        axios.get("http://localhost:8080/api/chat/messages", {params: {sender: JSON.parse(localStorage.getItem("user")).username, receiver: contact}})
            .then(
                (response) => {
                    this.setState((prevState) => ({
                        ...prevState,
                        messages: response.data.data.messages, // Update only field2
                    }));

                    console.log("Initialize WebSocket Connection");
                    let ws = new SockJS(this.webSocketEndPoint);
                    this.stompClient = Stomp.over(ws);
                    const _this = this;
                    _this.stompClient.connect({}, function (frame) {
                        _this.stompClient.subscribe(response.data.data.topicName, function (sdkEvent) {
                            _this.onMessageReceived(sdkEvent);
                        });
                    }, this.errorCallBack);
                }
            )


    }


    render() {
        return (
            <>
                <div>
                    {localStorage.getItem("user")?<h1>{JSON.parse(localStorage.getItem("user")).username}</h1>:<h1>Chat</h1>}
                    <h1>Chats</h1>
                    <ul>
                        {this.state.contacts.map((contact, index) => (
                            <li key={index}
                                onClick={() => this.handleItemClick(contact)}
                                style={{ cursor: 'pointer' }}
                            >{contact}</li>
                        ))}
                    </ul>
                    <h1>Messages</h1>
                    <ul>
                        {this.state.messages.map((message, index) => (
                            <li key={index}><strong>{message.senderUsername}:</strong> {message.content}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Enter value"
                        value={this.state.inputValue}
                        onChange={this.handleInputChange}
                    />
                    <button onClick={this.handleButtonClick}>Get Value</button>
                </div>
            </>
        )
    }
}

export default Test