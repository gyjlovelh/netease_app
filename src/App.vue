<template>
    <div id="app">
        <div class="menu">
            <app-menu></app-menu>
        </div>
        <div class="play">
            <app-play></app-play>
        </div>
        <div class="main">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import menu from './components/menu.vue';
    import play from './components/play.vue';

    export default {
        components: {
            'app-menu': menu,
            'app-play': play
        },
        created() {
            window._vueInstance = new Vue();
            this.$http.get('/api/types').then(response => {
                sessionStorage.setItem('songTypes', JSON.stringify(response.body.result));
            });
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app 
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .menu
        position fixed 
        width 220px
        left 0
        top 48px
        bottom 0
        height 100%
    .main
        position absolute
        top 48px
        left 220px
        bottom 0
        right 0   
        z-index -1 
    .play
        z-index 99   
</style>
