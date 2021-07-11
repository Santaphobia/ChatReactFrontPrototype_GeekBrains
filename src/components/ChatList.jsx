import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Nav from "react-bootstrap/Nav";
import ChatItem from "./ChatItem";
import ChatListForm from "./ChatListForm";

export default function ChatList(props) {

    const chatsFromStore = useSelector(state => state.chats.chats);
    const dispatch = useDispatch();

    const chatItemRender = (key) => {
        return <ChatItem key={key} chatId={key} title={chatsFromStore[key].title} />
    }

    return (
        <Nav variant="tabs" className="flex-column chat-list-field">
            {Object.getOwnPropertyNames(chatsFromStore).map(chatItemRender)}
            <Nav.Item className="list-form">
                <ChatListForm />
            </Nav.Item>
        </Nav>
    )
}