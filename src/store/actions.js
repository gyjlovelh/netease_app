import * as types from './types.js';

export default {
    selectSong({commit}, param) {
        commit(types.SELECT_SONG, param);
    },
    progress({commit}, param) {
        commit(types.PROGRESS, param);
    },
    chats({commit}, param) {
        commit(types.WS_CHAT, param);
    },
    ws({commit}, param) {
        commit(types.WS_INSTANCE, param);
    }
};
