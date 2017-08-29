<template>
    <div class="mv-wrap">
        <div class="video-wrap">
            <p class="title">{{result.name}}<span style="font-size: 14px;margin-left: 12px;">{{result.singer}}</span></p> 
            <app-video :src="result.src"></app-video>
        </div>
        <div class="detail">
            <p class="d-mv">MV简介</p>
            <span class="c-time">发布时间：{{result.createtime}}</span>
            <span class="num">播放次数：234次</span>
            <p class="desc">{{result.desc}}</p>
        </div>
    </div>
</template>

<script>
import appVideo from '../player/video/video.vue';
export default {
    data() {
        return {
            result: {
                src: null
            }
        }
    },
    created() {
        this.$http.get('/api/getMvById?id=' + this.$route.params.id).then(response => {
            this.result = response.body.result;
        });
    },
    components: {
        appVideo
    }
}
</script>

<style lang="stylus" scoped>
    .mv-wrap
        text-align left 
        margin 0 auto
        width 1124px
        border 1px solid #ccc
        .video-wrap
            display inline-block
            width 860px
            padding 20px 30px
            border-right 1px solid #ccc
            .title
                font-size 26px
        .detail
            display inline-block
            float right
            margin-top 50px
            width 240px
            .d-mv
                font-size 14px
                font-weight bold
                margin-right 20px
                border-bottom 1px solid #ccc
            .c-time, .num
                display block 
                color #666
            .c-time
                margin-top 20px   
            .desc
                position relative
                margin-right 20px
                margin-top 20px         
                 
</style>
