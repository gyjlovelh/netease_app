import * as types from './types.js';
import getters from './getters.js';

const state = {
    cmusic: null,
    progress: 0,
    chats: [],
    ws: null
};

const mutations = {
    [types.SELECT_SONG](state, param) {
        state.cmusic = param;
    },
    [types.PROGRESS](state, param) {
        state.progress = param;
    },
    [types.WS_CHAT](state, param) {
        state.chats = param;
    },
    [types.WS_INSTANCE](state, param) {
        state.ws = param;
    }
};

export default {
    state,
    mutations,
    getters
};
