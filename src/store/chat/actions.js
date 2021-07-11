export const ADD_CHAT = "ACTIONS::ADD_CHAT";
export const REMOVE_CHAT = "ACTIONS::REMOVE_CHAT";
export const ADD_MESSAGE = "ACTIONS::ADD_MESSAGE";
export const REMOVE_MESSAGE = "ACTIONS::REMOVE_MESSAGE";
export const FETCH_ADD_MESSAGE = "ACTIONS::FETCH_ADD_MESSAGE";

export const addChat = (title, chatId) => ({
    type: ADD_CHAT,
    title,
    chatId
});

export const removeChat = (chatId) => ({
    type: REMOVE_CHAT,
    chatId,
});

export const addMessage = (chatId, text, user_id, name) => ({
    type: ADD_MESSAGE,
    chatId,
    text,
    user_id,
    name
});

export const removeMessage = (chatId, id) => ({
    type: REMOVE_MESSAGE,
    chatId,
    id,
});

export const fetchAddMessage = (chatId, text, user_id, name) => ({
    type: FETCH_ADD_MESSAGE,
    chatId,
    text,
    user_id,
    name
});