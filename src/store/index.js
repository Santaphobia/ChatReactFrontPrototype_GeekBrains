import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import chatReducer from "./chat/reducer";
import profileReducer from "./profile/reducer";
import createSagaMiddleware from "redux-saga";
import { connectRouter, routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import mainSaga from "./sagas/";
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

export const history = createBrowserHistory();

const createRootReducers = (history) =>
    combineReducers({
        router: connectRouter(history),
        chats: chatReducer,
        profile: profileReducer,
    });

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const persistedReducer = persistReducer(
    persistConfig,
    createRootReducers(history)
);

const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware)),
);

sagaMiddleware.run(mainSaga);

export const persistor = persistStore(store);
export default store;