import React, { useState, useEffect } from 'react'
import { Widget, addResponseMessage, toggleMsgLoader, renderCustomComponent, setQuickButtons } from 'react-chat-widget'
import { useDispatch, useSelector } from 'react-redux'
import { watsonInit } from '../../redux/modules/WatsonSession/action'
import { watsonTalks } from '../../redux/modules/Watson/action'
import MessageImage from './MessageImage'
import 'react-chat-widget/lib/styles.css'

export default function Chat({
    profileAvatar = "https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif",
    title = "Carlos",
    subtitle = "Seu Assistente virtual",
    placeholder = "Qual sua duvida?",
    fullscreen = false
}) {
    const dispatch = useDispatch()
    const [badge, setBadge] = useState(0)
    const [init, setInit] = useState(false)
    const watsonContext = useSelector(state => state.watsonSession.watsonContext)
    const messages = useSelector(state => state.watson.response)
    componentDidMount()

    useEffect(() => {
        function handleMessageReceived(msg) {
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
                
                case 'pause': 
                    toggleMsgLoader()
                    setTimeout(() => {
                        toggleMsgLoader()
                    }, msg.time)
                    break
                    
                default: return
            }
        }

        if (messages) {
            messages.forEach(msg => handleMessageReceived(msg))
        }
        
    }, [messages])

    function componentDidMount() {
        if (!init) {
            dispatch(watsonInit())
            setInit(true)
            setBadge(1)
        }
    }

    function handleNewUserMessage(newMessage) {
        setBadge(0)
        dispatch(watsonTalks(newMessage, watsonContext))
    }

    function handleQuickButtonClicked(value) {
        handleNewUserMessage(value)
        setQuickButtons([])
    }

    return (
        <>
            <Widget
                handleNewUserMessage={handleNewUserMessage}
                profileAvatar={profileAvatar}
                title={title}
                subtitle={subtitle}
                handleQuickButtonClicked={e => handleQuickButtonClicked(e)}
                senderPlaceHolder={placeholder}
                badge={badge}
                showCloseButton={fullscreen}
                fullScreenMode={fullscreen}
            />
        </>
    )
}

//https://github.com/Wolox/react-chat-widget
// RESCREVER PARA FUNCTION COMPONENT
// class Chat extends Component {

//     state = {
//         badge: 0,
//         init: false
//     }

//     componentDidMount() {
//         this.props.watsonInit()
//         alert(`componentDidMount ${this.state.init}`)
//     }

//     componentWillUnmount() {
//         alert(`componentWillUnmount ${this.state.init}`)
//     }

//     componentDidUpdate() {
//         // this.handleWatsonContextReceive()
//         if (this.props.watsonContext && !this.state.init) {
//             this.setState({ init: true })
//         }

//         if (this.props.messages) {
//             this.props.messages.forEach(msg => this.handleMessageReceived(msg))
//         }
//     }

//     // handleWatsonContextReceive() {
//     //     if (this.componentDidCreateNow && this.props.watsonContext) {
//     //         this.props.sendToWatson('', this.props.watsonContext)
//     //         this.componentDidCreateNow = false
//     //     }
//     // }

//     handleMessageReceived(msg) {
//         switch (msg.type) {
//             case 'text':
//                 addResponseMessage(msg.text || '')
//                 break

//             case 'image':
//                 renderCustomComponent(MessageImage, { data: msg.data })
//                 break

//             case 'option':
//                 addResponseMessage(msg.text)
//                 const result = msg.data.map(x => ({ label: x.label, value: x.text }))
//                 setQuickButtons(result)
//                 break
//             default: return
//         }
//     }

//     handleNewUserMessage = newMessage => {
//         this.props.sendToWatson(newMessage, this.props.watsonContext)
//     }

//     handleQuickButtonClicked = value => {
//         this.handleNewUserMessage(value)
//         setQuickButtons([])
//     }

//     render() {
//         return (
//             <>
//                 <Widget
//                     handleNewUserMessage={this.handleNewUserMessage}
//                     profileAvatar={"https://cdn.dribbble.com/users/722835/screenshots/4082720/bot_icon.gif"}
//                     title="Carlos"
//                     subtitle="Assistente virtual"
//                     handleQuickButtonClicked={e => this.handleQuickButtonClicked(e)}
//                     senderPlaceHolder="Qual sua duvida?"
//                     badge={this.badge}
//                     showCloseButton={this.props.fullscreen}
//                     fullScreenMode={this.props.fullscreen}
//                 />
//             </>
//         )
//     }
// }

// const mapDispatchToProps = dispatch => {
//     return {
//         sendToWatson: (msg, context) => dispatch(watsonTalks(msg, context)),
//         watsonInit: () => dispatch(watsonInit())
//     }
// }

// const mapStateToProps = state => {
//     return {
//         watsonContext: state.watsonSession.watsonContext,
//         messages: state.watson.response
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Chat)