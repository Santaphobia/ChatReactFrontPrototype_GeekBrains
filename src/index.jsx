import React from "react";
import ReactDOM from "react-dom";
import Router from "./components/Router";
import { Provider } from "react-redux";
import  store, { history, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { ConnectedRouter } from "connected-react-router";
import { FirebaseAuthProvider } from "@react-firebase/auth";
import { config } from "./services/firebaseConfig"
import firebase from "firebase";

import "bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <ConnectedRouter history={history}>
                <FirebaseAuthProvider firebase={firebase} {...config}>
                    <Router />
                </FirebaseAuthProvider>
            </ConnectedRouter>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);
