import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import { useSelector } from "react-redux";
import Container from "react-bootstrap/Container";

export default function Profile() {
    const profileFromStore = useSelector(state => state.profile)
    return(
            <Container className="p-2">
                <Header />
                <p>{profileFromStore.name}</p>
            </Container>
    )
}