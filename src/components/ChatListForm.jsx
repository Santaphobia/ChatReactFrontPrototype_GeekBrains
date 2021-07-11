import React, { useState, useCallback, useEffect, useRef } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { addChat } from "../store/chat/actions";
import { push } from "connected-react-router";
import { useDispatch, useSelector } from "react-redux";

export default function ChatListForm(props) {
    const [value, setValue] = useState('');

    const chatsFromStore = useSelector(state => state.chats.chats);
    const dispatch = useDispatch();

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const add = useCallback((event) => {
        event.preventDefault();
        const newChatId = Object.keys(chatsFromStore).length + 1;
        dispatch(addChat(value, newChatId));
        setValue('');
        dispatch(push(`/chat/${newChatId}`));
    }, [chatsFromStore, value, dispatch])

    return (
        <form onSubmit={add}>
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="Добавить"
                    aria-label="Добавить"
                    aria-describedby="basic-addon2"
                    value={value}
                    onChange={handleChange}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" type="submit" value="Отправить">+</Button>
                </InputGroup.Append>
            </InputGroup>
        </form>
    )
}