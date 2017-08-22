import * as types from './types.js';

export default {
    demo({commit}, param) {
        commit(types.DEMO);
    },
    selectSong({commit}, param) {
        commit(types.SELECT_SONG, param);
    },
    progress({commit}, param) {
        commit(types.PROGRESS, param);
    }
};