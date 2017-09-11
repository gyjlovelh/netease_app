import Vue from 'vue';
import Router from 'vue-router';

/** upload */
import uploadSong from '../components/upload/song.vue';
import tunnel from '../components/upload/tunnel.vue';
import uploadMv from '../components/upload/mv.vue';
/** my */
import uploads from '../components/my/uploads/uploads.vue';
import myMvs from '../components/my/mv/mv.vue';
import edit from '../components/playlist/edit.vue';
/** recommend */
import rfind from '../components/recommend/find/find.vue';
import rmv from '../components/recommend/mv/mv.vue';
import rfriends from '../components/recommend/friends/friends.vue';

import mv from '../components/mv/mv.vue';

/**
 * playlist
 */
import playlist from '../components/playlist/playlist.vue';

/**
 * user
 */
import home from '../components/user/home.vue';
import follows from '../components/user/follows.vue';
import fans from '../components/user/fans.vue';
import setting from '../components/user/setting.vue';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/recommend/find',
            component: rfind
        },
        {
            path: '/recommend/mv',
            component: rmv
        },
        {
            path: '/recommend/friends',
            component: rfriends
        },
        {
            path: '/my/uploads',
            component: uploads
        },
        {
            path: '/my/music/edit/:id',
            component: edit
        },
        {
            path: '/my/mv',
            component: myMvs
        },
        {
            path: '/upload',
            component: tunnel,
            children: [
                {
                    path: 'song',
                    component: uploadSong
                },
                {
                    path: 'mv',
                    component: uploadMv
                }
            ]
        },
        {
            path: '/mv/:id',
            component: mv
        },
        {
            path: '/playlist/:id',
            component: playlist
        },
        {
            path: '/my/playlist/:id',
            component: playlist
        },
        {
            path: '/user/home/:id',
            component: home
        },
        {
            path: '/user/follows/:id',
            component: follows
        },
        {
            path: '/user/fans/:id',
            component: fans
        },
        {
            path: '/user/setting',
            component: setting
        }
    ]
});
