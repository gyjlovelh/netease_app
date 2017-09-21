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
        <div class="elevator">
            <a class="e-msg" @click="$router.push('/upload')">
                <Icon type="android-upload" :color="'#b5b9bc'" :size="24"></Icon>
                <span class="e-span">上传文件</span>
            </a>
            <a class="e-msg" target="_blank" href="https://github.com/gyjlovelh/netease_app">
                <Icon type="social-github" :color="'#b5b9bc'" :size="24"></Icon>
                <span class="e-span">git地址</span>
            </a>
            <a class="e-msg" @click="$router.push('/chat')" href="javascript:;">
                <Icon type="android-chat" :color="'#b5b9bc'" :size="24"></Icon>
                <span class="e-span">聊天室啊</span>
                <Badge :count="chatCount">
                    <a href="javascript:;" class="demo-badge"></a>
                </Badge>
            </a>
        </div>
    </div>
</template>

<script>
    import menu from './components/menu.vue';
    import play from './components/play.vue';

    export default {
        data() {
            return {
                isChatShow: false,
                userId: sessionStorage.getItem('userInfo'),
                ws: null,
                chats: [],
                chatContent: '',
                chatCount: 3
            }
        },
        components: {
            'app-menu': menu,
            'app-play': play
        },
        created() {
            this.$http.get('/api/types').then(response => {
                sessionStorage.setItem('songTypes', JSON.stringify(response.body.result));
            });
            this.ws = new WebSocket('ws://localhost:8181');
            let _this = this;
            this.ws.onopen = function (e) {
                console.log('ws connection...', e);
                console.log(e.target.chats);
                _this.chats = e.target.chats;
                console.log('target', _this.chats);
            };
            this.ws.onmessage = function (msg) {
                this.chatCount = JSON.parse(msg.data).length;
                console.log('chac', this.chatCount)
            };
        },
        methods: {}
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
    .elevator
        position fixed
        padding 0 16px
        right 0px
        bottom 100px
        width 60px
        background #fff
        box-shadow 0 4px 12px 0 rgba(7, 17, 27, .1)
        .e-msg
            display block
            width 26px
            height 57px
            padding 16px 0
            font-size 22px
            line-height 20px
            color #b5b9bc
            box-sizing border-box
            text-align center
            border-bottom 1px solid #edf1f2
            &:hover
                .ivu-icon
                    display none
                .e-span
                    display block
                .ivu-badge-count
                    display none
            .e-span
                display none
                font-size 12px
                line-height 12px

.chat-footer
    margin 0px 50px

</style>
