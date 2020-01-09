import React, { Component } from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget'
import 'react-chat-widget/lib/styles.css';

//https://github.com/Wolox/react-chat-widget
class Chat extends Component {

    componentDidMount() {
        addResponseMessage("Welcome to this awesome chat!");
    }

    handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
        // Now send the message throught the backend API
    }

    render() {
        return (
            <>
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    profileAvatar={"https://api.adorable.io/avatars/50/abott@adorable.pngCopy"}
                    title="Cloudia"
                    subtitle="Chatbot manjudo"
                />
            </>
        )
    }
}

export default Chat