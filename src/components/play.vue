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
                                <Icon v-if="paused" type="ios-play" color="white" size="30"></Icon>
                                <Icon v-if="!paused" type="ios-pause" color="white" size="30"></Icon>
                            </div>
                        </Col>
                        <Col span="8">
                            <div @click="next">
                                <Icon type="ios-fastforward" color="white" size="24"></Icon>
                            </div>
                        </Col>
                    </Row>
                </template>
                <audio ref="audio" controls="controls" 
                    style="position: fixed;left: 0; top: 0;z-index: -1;display: none;" 
                    @timeupdate="timeupdate" 
                    @progress="audioProgress"
                    @loadstart="loadstart"
                    @loadeddata="loadeddata"
                    @loadedmetadata="loadedmetadata"
                    @canplay="canplay">

                    <source :src="cmusic.src" type="audio/mpeg">
                    Your browser does not support the audio tag.
                </audio>
            </div>
            <div class="m-vol">
                <template>
                    <Slider v-model="voice" @on-input="voiceChange" :tip-format="format"></Slider>
                </template>
            </div>
            <div class="m-view">
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
                            <p class="m-singer">{{cmusic.singer}}--雷子</p>
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
                </div>        
            </div>
            <div class="m-else">
                <router-link to="/upload">
                    <Icon type="ios-cloud-upload-outline" :size="26" style="font-size: 26px;margin: 0px 13px;position: relative;top: 12px;"></Icon>
                </router-link>
                <a class="to-git" target="_blank" href="https://github.com/gyjlovelh/netease_app">
                    <Icon type="social-github" :size="26"></Icon>
                </a> 
                <!-- <a style="float: right;height: 48px;" href="javascript:;">
                    <img style="border-radius: 99px;" width="24" height="24" :src="cmusic.cover">
                </a>         -->
            </div>  
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                paused: true,
                voice: 59,
                progress: 0,
                currentTime: 0,
                duration: 0,
                cmusic: {
                    src: ''
                },
                sList: []
            }
        },
        mounted() {
            this.$http.get('/api/songs').then(response => {
                response.body.result.forEach(item => {
                    item.cover = 'http://localhost:3000/' + item.cover.replace('public/', '');
                    item.src = 'http://localhost:3000/' + item.src.replace('public/', '');
                });
                this.sList = response.body.result;
                this.cmusic = this.sList[0];
                this.$refs['audio'].load();
            });
        },
        computed: {
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
            /**
             *  @description 设置声音大小
             */
            voiceChange(v) {
                this.$refs['audio'].volume = v / 100;
            },
            /**
             *  @description 拖拽/点选进度
             */
            progressChange(p) {
                this.$refs['audio'].currentTime = Math.floor(this.$refs['audio'].duration * p / 100);
                this.progress = this.currentTime / this.duration * 100;
            },
            /**
                @description 上一曲
             */
            prev() {
                let _index = 0;
                this.sList.forEach((item, index) => {
                    if (item._id === this.cmusic._id) {
                        if (index === 0) {
                            _index = this.sList.length - 1;
                        } else {
                            _index = index - 1;
                        }
                    }
                });
                this.cmusic = this.sList[_index];
                this.$refs['audio'].load();
                this.$refs['audio'].play();
            },
            /**
                @description 播放/暂停
             */
            playOrPause() {
                if (this.$refs['audio'].paused) {
                    this.$refs['audio'].play();
                } else {
                    this.$refs['audio'].pause();
                }
                this.paused = this.$refs['audio'].paused;
            },
            /**
                @description 下一曲
             */
            next() {
                let _index = 0;
                this.sList.forEach((item, index) => {
                    if (item._id === this.cmusic._id) {
                        _index = (index + 1) % this.sList.length;
                    }
                });
                this.cmusic = this.sList[_index];
                this.$refs['audio'].load();
                this.$refs['audio'].play();
            },
            /**
                @description audio可以播放时
             */
            loadstart(e) {
                console.log('loadstart ....', e)
            },
            loadeddata() {
                console.log('loadeddata ....')
            },
            loadedmetadata() {
                console.log('loadedmetadata ....')
            },
            canplay(e) {
                console.log('...can play')
                this.duration = Math.floor(e.target.duration);
            },
            audioProgress(e) {
                console.log('progress...');
            },
            /**
                @description 进度发生改变
             */
            timeupdate(e) {
                this.currentTime = Math.floor(e.target.currentTime);
                this.progress = this.currentTime / this.duration * 100;
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
                .to-git
                    display inline-block
                    line-height 48px
                    text-align center
                    width: 30px
                    float right 
                    .ivu-icon
                        position relative
                        top 10px    

</style>

