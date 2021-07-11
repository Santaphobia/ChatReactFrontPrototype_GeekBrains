import React, { useState, useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useParams, Redirect } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import MessageField from "./MessageField";
import MessageForm from "./MessageForm";
import ChatList from "./ChatList";
import Header from "./Header";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {addChat, addMessage} from "../store/chat/actions";


export default function App(props) {

    const {chatId} = useParams();
    const chatsFromStore = useSelector(state => state.chats.chats)
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/v1/chat').then(res => {
            Object.getOwnPropertyNames(res.data).forEach(chat => {
                dispatch(addChat(res.data[chat].title, chat));
                res.data[chat].messageList.forEach(message => dispatch(addMessage(chat, message.text, message.user_id, message.name)))
            })
        });
    }, []);

    return (
        <Container className="p-2">
            <Header />
            <Row>
                <Col sm={chatId ? 2 : 12}>
                    <ChatList />
                </Col>
                {chatId && <Col sm={10}>
                    {chatsFromStore[chatId] ? <MessageField /> : <Redirect to="/" />}
                </Col>}
            </Row>
            {chatId && <MessageForm />}
        </Container>
    );
}
