import * as types from './types.js';
import getters from './getters.js';

const state = {
    cmusic: null,
    progress: 0
};

const mutations = {
    [types.DEMO](state, param) {
        state.count = param;
    },
    [types.SELECT_SONG](state, param) {
        state.cmusic = param;
    },
    [types.PROGRESS](state, param) {
        state.progress = param;
    }
}

export default {
    state,
    mutations,
    getters
};