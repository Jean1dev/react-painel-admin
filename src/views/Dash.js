import React from 'react'
import Chat from '../components/Chat'
import Dashboard from './Dashboard'

function detectar_mobile() {
    if (navigator.userAgent.match(/Android/i)
        || navigator.userAgent.match(/webOS/i)
        || navigator.userAgent.match(/iPhone/i)
        || navigator.userAgent.match(/iPad/i)
        || navigator.userAgent.match(/iPod/i)
        || navigator.userAgent.match(/BlackBerry/i)
        || navigator.userAgent.match(/Windows Phone/i)
    ) {
        return true;
    }
    else {
        return false;
    }
}

export default function Dash() {
    const isMobile = detectar_mobile()

    if (isMobile) {
        return <Chat fullscreen={false}></Chat>
    }
    return <Dashboard></Dashboard>
}
