import React, { useState, useCallback, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";

export default function BackToDownButton(props) {
    return (
        <>
        { props.showButton && <Button variant="outline-secondary" className="back-to-top-btn" onClick={props.changeShowButton}>Down</Button> }
        </>
    );
}