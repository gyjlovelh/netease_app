<template>
    <div class="c-follows">
        <h2>{{ff}}（6）</h2>
        <ul class="follows-ul">
            <li class="item" v-for="item in items">
                <div class="f-l">
                    <img src="../user/uuu.jpg" width="60" height="60" alt="">
                </div>
                <div class="f-r">
                    <p>
                        <a>木木木木</a>
                        <Icon size="20" color="#ffb4b2" type="female"></Icon>
                        <Icon size="20" color="#25a5e3" type="male"></Icon>
                        <Button size="small" type="text">关注（4）</Button>
                        <Button size="small" type="text">粉丝（8）</Button>
                    </p>
                    <p>卡司法局阿尔法还ufhakseuf</p>
                    <Button v-if="isFollows" class="f-btn" size="small" type="primary" icon="plus-round">关注</Button>
                    <Button v-else-if="isEachFollows" class="f-btn" size="small" type="text" icon="checkmark-round">已关注</Button>
                    <Button v-else class="f-btn" size="small" type="text" icon="arrow-swap">相互关注</Button>
                </div>
            </li>
        </ul>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['ff'],
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
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .c-follows
        text-align left
        margin-bottom 50px
        h2
            border-bottom 2px solid #c20c0c
            font-size 18px
        .follows-ul
            border-left 1px solid #ccc
            border-bottom 1px solid #ccc
            .item
                width 50%
                padding 20px 0
                border-right 1px solid #ccc
                position relative
                display inline-block
                .f-l
                    position absolute
                    left 10px
                    img
                        border 1px solid #ccc
                .f-r
                    margin-left 80px
                    .f-btn
                        position absolute
                        margin-top -12px
                        right 15px
                        top 50%
</style>


