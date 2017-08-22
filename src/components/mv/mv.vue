<template>
    <div class="mv-wrap">
        <div class="video-wrap">
            <p class="title">Wake Me Up(cover by J.Fla)</p>
            <app-video></app-video>
        </div>
        <div class="detail">
            <p class="d-mv">MV简介</p>
            <span class="c-time">发布时间：2017-05-23</span>
            <span class="num">播放次数：234次</span>
            <p class="desc">两个输入项通过 c-form 组件导入
由于没有登录接口调用，初步想法是：点击登录，将c-from组件输入的值（用户名和密码）保存在 sessionStorage 中，通过判断 sessionStorage 是否保存了用户信息，来决定用户的操作权限。</p>
        </div>
    </div>
</template>

<script>
import appVideo from '../player/video/video.vue';
export default {
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
