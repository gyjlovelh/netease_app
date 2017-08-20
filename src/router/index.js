import Vue from 'vue';
import Router from 'vue-router';

import playlist from '../components/playlist.vue';
import album from '../components/album/album.vue';
import upload from '../components/upload/upload.vue';

Vue.use(Router);

export default new Router({
  routes: [
      {
          path: '/my/music/playlist',
          component: playlist
      },
      {
          path: '/my/album',
          component: album
      },
      {
          path: '/upload',
          component: upload
      }
  ]
});
