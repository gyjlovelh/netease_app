<template>
    <div class="fans-wrap">
        <userInfo></userInfo>
        <ffList :ff="'粉丝'"></ffList>
    </div>
</template>

<script type="text/ecmascript-6">
    import userInfo from '../common/userInfo.vue';
    import ffList from '../common/ffList.vue';

    export default {
        data() {
            let arr = [];
            for (let i = 0; i < 20; i++) {
                arr.push(i);
            }
            return {
                items: arr,
                isFollows: false,
                isEachFollows: true
            }
        },
        components: {
            'userInfo': userInfo,
            'ffList': ffList
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .fans-wrap
        width 940px
        border 1px solid #ccc
        padding 20px 50px
        margin 0 auto

</style>


