import React, { useState, useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import Nav from "react-bootstrap/Nav";
import { removeChat } from "../store/chat/actions";

export default function ChatItem(props) {
    const dispatch = useDispatch();

    const handleNavigate = useCallback((event) => {
        event.preventDefault();
        dispatch(push(`/chat/${props.chatId}`));
    }, [dispatch]);

    const delChat = useCallback(() => {
        dispatch(removeChat(props.chatId));
    }, [props.chatId, dispatch]);

    return (
        <Nav.Item>
            <Nav.Link onClick={handleNavigate}> {props.title} </Nav.Link><span onClick={delChat}>x</span>
        </Nav.Item>
    );
}