<template>
    <div class="home-wrap">
        <user-info></user-info>
        <div class="c-pl">
            <h2>殳呜呜创建的歌单（20）</h2>
            <gd-list :items="items"></gd-list>
        </div>
        <div class="s-pl">
            <h2>殳呜呜收藏的歌单（13）</h2>
            <gd-list :items="items"></gd-list>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    import gdList from '../common/gdList.vue';
    import userInfo from '../common/userInfo.vue';

    export default {
        data() {
            let arr = [];
            for (let i = 0; i < 17; i++) {
                arr.push(i);
            }
            return {
                items: arr
            }
        },
        components: {
            userInfo,
            gdList
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .home-wrap
        width 940px
        border 1px solid #ccc
        padding 20px 50px
        margin 0 auto
        .cnt
            min-height 200px
            margin-bottom 40px
            .c-left
                position absolute
                width 200px
                img
                    border 1px solid #ccc
            .c-right
                margin-left 220px
                text-align left
                p
                    margin-bottom 10px
                .c-t
                    .c-user
                        font-weight bold
                        font-size 18px
        .c-pl, .s-pl
            text-align left
            margin-bottom 50px
            h2
                border-bottom 2px solid #c20c0c
                font-size 18px

</style>


