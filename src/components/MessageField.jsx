import React, { useState, useCallback, useEffect, useRef } from "react";
import Message from "./Message";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import BackToDownButton from "./BackToDownButton";

export default function MessageField(props) {
    const [backToDownShow, changeBackToDownShow] = useState(false);

    const messageFieldEl = useRef(null);
    const {chatId} = useParams();
    const messagesFromStore = useSelector(state => state.chats.chats[chatId])

    const backToDown = useCallback(() => {
        messageFieldEl.current.scrollTop = messageFieldEl.current.scrollHeight;
    })

    useEffect(()=>{
        if(messageFieldEl.current.scrollHeight - (messageFieldEl.current.scrollTop + messageFieldEl.current.clientHeight) < 81) {
            backToDown()
        } else {
            changeBackToDownShow(true)
        }
    }, [messagesFromStore.messageList])

    const scrollChange = () => {
        if(messageFieldEl.current.scrollHeight - (messageFieldEl.current.scrollTop + messageFieldEl.current.clientHeight) < 35) {
            changeBackToDownShow(false);
        } else {
            changeBackToDownShow(true)
        }
    }

    const messageRender = (message) => {
        return <div key={message.id}><Message message={ message } /></div>
    }

    return (
        <div className="message-field" id="messageField" ref={messageFieldEl} onScroll={scrollChange}>
            <div className="title-message-field">{messagesFromStore.title}</div>
            {messagesFromStore.messageList.map(messageRender)}
            <BackToDownButton showButton={backToDownShow} changeShowButton={backToDown}/>
        </div>

    );
}