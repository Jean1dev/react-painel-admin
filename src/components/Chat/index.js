import React, { Component } from 'react'
import { Widget, addResponseMessage } from 'react-chat-widget'
import { connect } from 'react-redux'
import { watsonInit } from '../../redux/modules/WatsonSession/action'
import { watsonTalks } from '../../redux/modules/Watson/action'

import 'react-chat-widget/lib/styles.css';

//https://github.com/Wolox/react-chat-widget
class Chat extends Component {

    componentDidMount() {
        addResponseMessage("oi")
        this.props.watsonInit()
    }

    componentDidUpdate() {
        if (this.props.messages) {
            const { result } = this.props.messages.data
            console.log('componentDidUpdate', result.output.generic[0])
        }
    }

    handleNewUserMessage = (newMessage) => {
        this.props.sendToWatson(newMessage, this.props.watsonContext)
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

const mapDispatchToProps = dispatch => {
    return {
        sendToWatson: (msg, context) => dispatch(watsonTalks(msg, context)),
        watsonInit: () => dispatch(watsonInit())
    }
}

const mapStateToProps = state => {
    return {
        watsonContext: state.watsonSession.watsonContext,
        messages: state.watson.response
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Chat)