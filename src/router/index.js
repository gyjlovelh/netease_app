import Vue from 'vue';
import Router from 'vue-router';

import playlist from '../components/playlist.vue';
import album from '../components/album/album.vue';
import upload from '../components/upload/upload.vue';
import uploads from '../components/uploads/uploads.vue';
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
            path: '/my',
            component: uploads,
            children: [
                {
                    path: 'uploads',
                    component: uploads
                },
                {
                    path: 'article',
                    component: playlist
                },
                {
                    path: 'mv',
                    component: album
                },
                {
                    path: 'types',
                    component: album
                }
            ]
        },
        {
            path: '/upload',
            component: upload
        },
        {
            path: '/mv',
            component: mv
        }
    ]
});
