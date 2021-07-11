import React, { useState, useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import { IfFirebaseAuthed, IfFirebaseUnAuthed } from "@react-firebase/auth";
import "firebase/auth";
import firebase from "firebase";

export default function Header() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    }

    const profileFromStore = useSelector(state => state.profile)

    const logIn = useCallback(() => {
        firebase.auth().signInWithEmailAndPassword(email, password);
    })
    const signUp = useCallback(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password);
    })
    const logOut = useCallback((event) => {
        event.preventDefault();
        firebase.auth().signOut();
    })

    return(
        <Navbar bg="light" variant="light">
            <Navbar.Brand href="/">Messenger</Navbar.Brand>
            <IfFirebaseAuthed>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Список контактов</Nav.Link>
                    <Nav.Link href="#features">Добавить чат</Nav.Link>
                    <Nav.Link href="/profile/">{profileFromStore.name}</Nav.Link>
                    <Nav.Link href="#" onClick={logOut}>Выйти</Nav.Link>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Поиск" className="mr-sm-2" />
                    <Button variant="outline-secondary">Поиск</Button>
                </Form>
            </IfFirebaseAuthed>
            <IfFirebaseUnAuthed>
                <Form inline>
                    <FormControl type="email" placeholder="Почта" className="mr-sm-2" onChange={handleChangeEmail}/>
                    <FormControl type="password" placeholder="Пароль" className="mr-sm-2" onChange={handleChangePassword}/>
                    <Button variant="outline-secondary" onClick={logIn}>Войти</Button>
                    <Button variant="outline-secondary" onClick={signUp}>Зарегестрироваться</Button>
                </Form>
            </IfFirebaseUnAuthed>
        </Navbar>
    );
}