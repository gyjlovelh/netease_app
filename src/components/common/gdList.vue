<template>
    <ul class="custom-ul">
        <li v-if="item.name !== '我的最爱'" class="item" :class="{'item-last': index % 5 === 4}" v-for="(item, index) in items">
            <img src="./uuu.jpg" width="140" height="140" alt="">
            <div class="zz">
                <Icon color="#fff" size="16" type="play"></Icon>
            </div>
            <a @click="$router.push('/playlist/' + item._id)" class="pl-name">{{item.name}}</a>
            <a @click="$router.push('/user/home/' + item.creator._id)" class="pl-author" v-if="isAuthorShow">by <span v-if="item.creator" v-text="item.creator.nickname"></span></a>
        </li>
    </ul>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['items', 'isAuthorShow']
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .custom-ul
        .item
            position relative
            display inline-block
            margin 20px 33px 0 0
            .zz
                position absolute
                width 140px
                text-align center
                border-top 1px solid #000
                line-height 26px
                height 26px
                background rgba(0, 0, 0, 0.33);
                top 114px
                left 0
                box-shadow inset 0 0 1px 0 #fff
            img
                border 1px solid #ccc
                cursor pointer
            .pl-name, .pl-author
                display block
                &:hover
                    text-decoration underline
            .pl-name
                font-size 14px
                color #000 !important
        .item-last
            margin-right 0
</style>


