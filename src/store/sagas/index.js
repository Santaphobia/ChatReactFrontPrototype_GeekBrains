import {all} from "redux-saga/effects";
import watchBotSaga from "./bot";

export default function* mainSaga() {
    yield all([watchBotSaga()]);
}