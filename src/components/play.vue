/** Created by guanyj 2017/08/14 */
<template>
    <div class="m-wrap">
        <div class="m-area">
            <div class="m-opr">
                <template>
                    <Row>
                        <Col span="8">
                            <div @click="prev">
                                <Icon type="ios-rewind" color="white" size="24"></Icon>
                            </div>
                        </Col>
                        <Col span="8">
                            <div @click="playOrPause">
                                <Icon v-if="playerInfo.paused" type="ios-play" color="white" size="30"></Icon>
                                <Icon v-if="!playerInfo.paused" type="ios-pause" color="white" size="30"></Icon>
                            </div>
                        </Col>
                        <Col span="8">
                            <div @click="next">
                                <Icon type="ios-fastforward" color="white" size="24"></Icon>
                            </div>
                        </Col>
                    </Row>
                </template>
            </div>
            <div class="m-vol">
                <template>
                    <Slider v-model="playerInfo.voice" @on-input="voiceChange" :tip-format="format"></Slider>
                </template>
            </div>
            <div class="m-view" v-if="cmusic">
                <div class="m-l" style="display: inline-block;">
                     <img width="48" height="48" :src="cmusic.cover">
                </div>
                <div class="m-r">
                    <div class="content">
                        <div class="c-l">
                            <span>{{currentTimes}}</span>
                        </div>
                        <div class="c-c">
                            <p class="m-name">{{cmusic.name}}</p>
                            <p class="m-singer">{{cmusic.singer}}</p>
                        </div>
                        <div class="c-r">
                            <Icon style="position: absolute;right: 0px;top: 0px" type="ios-shuffle-strong" size="20"></Icon>
                            <span>{{surpluses}}</span>
                        </div>
                    </div>
                    <div class="progress-bar">       
                        <template>
                            <Slider v-model="progress" @on-change="progressChange" :tip-format="formatProgress"></Slider>
                        </template>
                    </div>
                    <app-player :emit="emit" :playerInfo="playerInfo"></app-player>
                </div>        
            </div>
            <div class="m-else">
                <a class="current-list" @click="csListShow = !csListShow">
                    <Icon type="ios-settings" :size="24"></Icon>
                </a>
                <Table v-show="csListShow" class="cs-list" highlight-row stripe 
                    :columns="csColumns"
                    @on-row-dblclick="selectSong"
                    :data="currentSongList">
                </Table>
                <router-link to="/upload">
                    <Icon type="ios-cloud-upload-outline" :size="26" style="font-size: 26px;margin: 0px 13px;position: relative;top: 12px;"></Icon>
                </router-link>
                <a class="to-git" target="_blank" href="https://github.com/gyjlovelh/netease_app">
                    <Icon type="social-github" :size="26"></Icon>
                </a> 
                <Button v-if="cUser" type="text">{{cUser.username}}</Button>
                <Button v-else type="text" @click="loginModal = true">登录</Button>
                <Modal v-model="loginModal" width="360">
                    <p slot="header">
                        <Button class="btn-io" :class="{'l-m-on': loginOrRegister}" @click="loginOrRegister = true" type="text" size="large">登录</Button>
                        <Button class="btn-io" :class="{'l-m-on': !loginOrRegister}" @click="loginOrRegister = false" type="text" size="large">注册</Button>
                    </p>
                    <Form :model="userInfo">
                        <Form-item>
                            <Input type="text" v-model="userInfo.username" placeholder="请输入账号">
                                <Icon type="ios-person" :size="20" slot="prepend"></Icon> 
                            </Input>
                        </Form-item>
                        <Form-item>
                            <Input type="password" v-model="userInfo.password" placeholder="请输入密码">
                                <Icon type="locked" :size="16" slot="prepend"></Icon> 
                            </Input>
                        </Form-item>
                        <Form-item v-if="!loginOrRegister">
                            <Input type="password" placeholder="请确认密码">
                                <Icon type="locked" :size="16" slot="prepend"></Icon> 
                            </Input>
                        </Form-item>
                    </Form>
                    <p slot="footer">
                        <Button v-if="loginOrRegister" type="info" long @click="login">登录</Button>
                        <Button v-else type="info" long @click="register">注册</Button>
                    </p>
                </Modal>   
            </div>  
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import Vue from 'vue';
    import player from './player/player.vue';
    import isPlayBtn from './renders/isPlayBtn.vue';

    export default {
        data() {
            return {
                emit: new Vue(),
                playerInfo: {
                    paused: true,
                    voice: 60,
                    currentTime: 0,
                    duration: 0,
                    circleStyle: 0
                },
                progress: 0,
                currentTime: 0,
                duration: 0,
                cUser: null,
                loginModal: false,
                loginOrRegister: true,
                userInfo: {
                    username: '',
                    password: ''
                },
                csListShow: false,
                csColumns: [
                    {
                        title: '#',
                        width: 50,
                        render(h, params) {
                            return h(isPlayBtn, {
                                props: {
                                    row: params.row
                                }
                            })
                        }
                    },
                    {
                        title: '歌名',
                        key: 'name',
                        ellipsis: true
                    },
                    {
                        title: '艺人',
                        key: 'singer',
                        ellipsis: true
                    },
                    {
                        title: '时长',
                        key: 'duration'
                    }
                ],
                currentSongList: []
            }
        },
        components: {
            'app-player': player
        },
        created() {
            let cUserId = sessionStorage.getItem('userInfo') || null;
            if (cUserId) {
                this.$http.post('/api/findUserById', {id: cUserId}).then(response => {
                    this.cUser = response.body.result;
                });
            };
        },
        mounted() {
            this.$http.get('/api/songs').then(response => {
                response.body.result.forEach(item => {
                    item.cover = 'http://localhost:3000/' + item.cover.replace('public/', '');
                    item.src = 'http://localhost:3000/' + item.src.replace('public/', '');
                });
                this.currentSongList = response.body.result;
                this.$store.commit('SELECT_SONG', this.currentSongList[0]);
            });
            this.emit.$on('progress', ctime => {
                this.currentTime = ctime;
                this.progress = this.currentTime / this.duration * 100;
            });
            this.emit.$on('loadSuccess', info => {
                this.duration = info.duration;
            });
            this.emit.$on('ended', flag => {
                if (flag) {
                    this.prev();
                }
            });
        },
        computed: {
            cmusic() {
                return this.$store.getters['cmusic'];
            },
            currentTimes() {
                let m = Math.floor(this.currentTime / 60);
                let s = Math.floor(this.currentTime - m * 60);
                return m + ':' + (s > 10 ? s : '0' + s);
            },
            surpluses() {
                let surplus = this.duration - this.currentTime;
                let m = Math.floor(surplus / 60);
                let s = Math.floor(surplus - m * 60);
                return '-' + m + ':' + (s > 10 ? s : '0' + s);
            }
        },
        methods: {
            format(v) {
                return '声音' + v + '%';
            },
            formatProgress(p) {
                return '进度' + p + '%';
            },
            selectSong(p) {
                this.$store.commit('SELECT_SONG', p);
            },
            /**
             *  @description 设置声音大小
             */
            voiceChange(v) {
                this.playerInfo.voice = v;
            },
            /**
            * @description 上一曲
            */
            prev() {
                let _index = 0;
                let _cmusic = this.$store.getters['cmusic'];
                this.currentSongList.forEach((item, index) => {
                    if (item._id === _cmusic._id) {
                        if (index === 0) {
                            _index = this.currentSongList.length - 1;
                        } else {
                            _index = index - 1;
                        }
                    }
                });
                this.$store.commit('SELECT_SONG', this.currentSongList[_index]);
            },
            /**
            * @description 播放/暂停
            */
            playOrPause() {
                this.playerInfo.paused = !this.playerInfo.paused;
            },
            /**
            * @description 下一曲
            */
            next() {
                let _index = 0;
                let _cmusic = this.$store.getters['cmusic'];
                this.currentSongList.forEach((item, index) => {
                    if (item._id === _cmusic._id) {
                        _index = (index + 1) % this.currentSongList.length;
                    }
                });
                this.$store.commit('SELECT_SONG', this.currentSongList[_index]);
            },
            /**
             *  @description 拖拽/点选进度
             */
            progressChange(p) {
                this.$store.commit('PROGRESS', Math.floor(this.duration * p / 100));
            },
            register() {
                this.$http.post('/api/register', this.userInfo).then(response => {
                    console.log(response);
                    sessionStorage.setItem('userInfo', response.body.result._id);
                });
            },
            login() {
                this.$http.post('/api/login', this.userInfo).then(response => {
                    if (response.body.result) {
                        this.cUser = response.body.result;
                        sessionStorage.setItem('userInfo', response.body.result._id);
                    }
                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    h = 48px

    .m-wrap
        position fixed
        top 0
        left 0
        right 0
        height h
        line-height h
        background #ccc
        .m-area
            line-height h
            font-size 0
            height h
            width 95%
            min-width 600px
            display block
            border-top none
            border-bottom none
            margin 0 auto
            text-align left
            .m-opr, .m-vol, .m-view, .m-else
                display inline-block
                float left
            .m-opr
                width 17%
                text-align center
                .ivu-col
                    cursor pointer
                    .ivu-icon
                        display block
                        margin 12px 0    
                    .ivu-icon-ios-play
                        margin 9px 0    
            .m-vol
                width 10%
                margin 6px 0
            .m-view
                display flex
                width 46%
                background #ddd
                flex-direction row
                .m-l
                    width 48px
                    height 48px
                .m-r
                    width 100%
                    height 48px 
                    .content
                        height 44px
                        width 100%
                        font-size 0
                        .c-l, .c-c, .c-r
                            display inline-block
                            font-size 12px
                            color #777
                        .c-l
                            width 20%
                        .c-c
                            width 60%
                            text-align center
                            .m-name, .m-singer
                                line-height 22px
                                height 22px
                            .m-name
                                color #444   
                                font-size 14px 
                            .m-singer
                                font-size 12px
                        .c-r
                            position relative
                            text-align right
                            width 20%     
                    .progress-bar
                        height 4px
                        width 100%
                        .ivu-slider
                            position relative
                            top -16px
            .m-else
                width 27%
                position relative
                .to-git
                    display inline-block
                    line-height 48px
                    text-align center
                    width: 30px
                    float right 
                    .ivu-icon
                        position relative
                        top 10px 
                .current-list
                    display inline-block
                    line-height 48px
                    text-align center
                    width: 30px
                    float left        
                    .ivu-icon
                        position relative
                        top 10px 
                .cs-list
                    position absolute
                    top 50px
                    right 0
                    width 400px
                    max-height 492px
                    overflow-y scroll
                    border 1px solid #ccc

</style>

