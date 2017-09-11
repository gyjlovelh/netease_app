<template>
    <div class="cnt">
        <div class="c-left">
            <img src="../user/uuu.jpg" width="190" height="190" alt="">
        </div>
        <div class="c-right">
            <p class="c-t">
                <span class="c-user">冯提莫</span>
                <Icon size="20" color="#ffb4b2" type="female"></Icon>
                <Icon size="20" color="#25a5e3" type="male"></Icon>
                <Button icon="checkmark-round" type="ghost">已关注</Button>
                <Button icon="arrow-swap" type="ghost">相互关注</Button>
                <Button icon="plus-round" type="primary">关注</Button>
            </p>
            <p class="c-fan">
                <Button @click="$router.push('/user/follows/1234')" type="dashed">关注（13）</Button>
                <Button @click="$router.push('/user/fans/1234')" type="dashed">粉丝（234343）</Button>
            </p>
            <p>个人简介：有一种姑娘 你是绝对无法将她硬拉到你的身边 你只能大步向前走 让她自己转过身去追寻你 如果她最终没有跟过来 那感到遗憾的应该是谁</p>
            <p>所在地区：湖北-武汉</p>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>


