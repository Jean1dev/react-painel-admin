import React, { Component } from 'react'
import { Widget, addResponseMessage, toggleMsgLoader, renderCustomComponent, setQuickButtons } from 'react-chat-widget'
import { connect } from 'react-redux'
import { watsonInit } from '../../redux/modules/WatsonSession/action'
import { watsonTalks } from '../../redux/modules/Watson/action'
import MessageImage from './MessageImage'

import 'react-chat-widget/lib/styles.css';

//https://github.com/Wolox/react-chat-widget
class Chat extends Component {

    componentDidMount() {
        this.componentDidCreateNow = true
        this.badge = 0
        this.props.watsonInit()
    }

    handleWatsonContextReceive() {
        if (this.componentDidCreateNow && this.props.watsonContext) {
            this.props.sendToWatson('', this.props.watsonContext)
            this.componentDidCreateNow = false
        }
    }

    handleMessageReceived(msg) {
        toggleMsgLoader()
        this.badge++
        switch (msg.type) {
            case 'text':
                addResponseMessage(msg.text || '')
                break

            case 'image':
                renderCustomComponent(MessageImage, { data: msg.data })
                break

            case 'option':
                addResponseMessage(msg.text)
                const result = msg.data.map(x => ({ label: x.label, value: x.text }))
                setQuickButtons(result)
                break
            default: return
        }
    }

    componentDidUpdate() {
        this.handleWatsonContextReceive()
        if (this.props.messages) {
            this.props.messages.forEach(msg => this.handleMessageReceived(msg))
        }
    }

    handleNewUserMessage = newMessage => {
        this.badge = 0
        toggleMsgLoader()
        this.props.sendToWatson(newMessage, this.props.watsonContext)
    }

    handleQuickButtonClicked = value => {
        this.handleNewUserMessage(value)
        setQuickButtons([])
    }

    render() {
        return (
            <>
                <Widget
                    handleNewUserMessage={this.handleNewUserMessage}
                    profileAvatar={"https://api.adorable.io/avatars/50/abott@adorable.pngCopy"}
                    title="Cloudia"
                    subtitle="Chatbot manjudo"
                    handleQuickButtonClicked={e => this.handleQuickButtonClicked(e)}
                    badge={this.badge}
                    showCloseButton={this.props.fullscreen}
                    fullScreenMode={this.props.fullscreen}
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