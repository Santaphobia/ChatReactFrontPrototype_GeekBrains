import {takeEvery, put} from "redux-saga/effects";
import {ADD_MESSAGE, FETCH_ADD_MESSAGE} from "../chat/actions";

const delay = (ms) => new Promise(res => setTimeout(res, ms))

function* botAnswer({chatId, text, user_id, name}) {
    yield put({type: ADD_MESSAGE, chatId, text, user_id, name});
    yield delay(1000);
    yield put({type: ADD_MESSAGE, chatId, text: 'bot', user_id: 1, name: 'bot'});
}

export default function* watchBotSaga() {
    yield takeEvery(FETCH_ADD_MESSAGE, botAnswer);
}