import React, { useState, useCallback, useEffect, useRef } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import App from "./App";
import Profile from "./Profile";
import HomePage from "./HomePage";

export default function Router(props) {
    return (
        <Switch>
            <Route exact path="/" component={ HomePage } />
            <Route exact path="/chat/:chatId/" children={ <App /> }/>
            <Route exact path="/profile/" component={Profile}/>
            <Route path="*" render={({location}) => (
                <Redirect
                    to={{
                        pathname: "/",
                        state: { from: location }
                    }}
                />
                )} />
        </Switch>
    );
}

