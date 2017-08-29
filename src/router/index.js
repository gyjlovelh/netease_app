import Vue from 'vue';
import Router from 'vue-router';

/** upload */
import uploadSong from '../components/upload/song.vue';
import tunnel from '../components/upload/tunnel.vue';
import uploadMv from '../components/upload/mv.vue';
/** my */
import uploads from '../components/my/uploads/uploads.vue';
import myMvs from '../components/my/mv/mv.vue';
/** recommend */
import rfind from '../components/recommend/find/find.vue';
import rmv from '../components/recommend/mv/mv.vue';
import rfriends from '../components/recommend/friends/friends.vue';

import mv from '../components/mv/mv.vue';

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
        }
    ]
});
