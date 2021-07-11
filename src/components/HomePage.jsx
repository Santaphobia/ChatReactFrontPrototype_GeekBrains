import React, { useState, useCallback, useEffect, useRef } from "react";
import Header from "./Header";
import Container from "react-bootstrap/Container";

export default function HomePage() {
    return (
        <Container className="p-2">
            <Header />
            <p>Домашняя</p>
        </Container>
    )
}