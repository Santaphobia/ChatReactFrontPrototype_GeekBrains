import update from "immutability-helper";
import { ADD_CHAT, ADD_MESSAGE, REMOVE_CHAT, REMOVE_MESSAGE } from "./actions";

const initialState = {
    chats: {
        1: {title: 'Чат 1', messageList: [{id:1, user_id:1, text:'text1', name: 'man1' }]},
        2: {title: 'Чат 2', messageList: [{id:2, user_id:2, text: 'text2', name: 'man2' }, {id:3, user_id:3, text: 'text3', name: 'man3' }]},
    },
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_CHAT:
            const newChatId = action.chatId;
            return update(state, {
                chats: {
                    $merge : {
                        [newChatId] : {
                            title: action.title,
                            messageList: []
                        }
                    }
                }
            });
        case REMOVE_CHAT:
            const chatId = action.chatId;
            return update(state, {
                chats: {
                    $unset: [chatId]
                }
            });
        case ADD_MESSAGE:
            const messageId = state.chats[action.chatId].messageList.length + 1;
            return update(state, {
                chats: {
                    $merge : {
                        [action.chatId]: {
                            title: state.chats[action.chatId].title,
                            messageList: update(state.chats[action.chatId].messageList, {
                                $push: [{
                                    id: messageId,
                                    user_id: action.user_id,
                                    text: action.text,
                                    name: action.name
                                }]
                            })
                        }
                    }
                }
            });
        case REMOVE_MESSAGE:
            const index = state.chats[action.chatId].messageList.findIndex((elem) => {
                if(elem.id === action.id) {
                    return true
                }
            });
            return update(state, {
                chats: {
                    $merge : {
                        [action.chatId] : {
                            title : state.chats[action.chatId].title,
                             messageList:  update(state.chats[action.chatId].messageList, {
                                 $splice: [[index, 1]]
                             })
                        }
                    }
                }
            });
        default:
            return state;
    }
}

export default reducer;