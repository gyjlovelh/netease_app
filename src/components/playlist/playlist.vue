<template>
    <div class="pl-wrap">
        <div class="cnt" v-if="gdInfo">
            <div class="c-left">
                <img :src="gdInfo.cover" width="200" height="200" alt="">
            </div>
            <div class="c-right-2">
                <h2 class="c-title pd-10">{{gdInfo.name}}</h2>
                <p class="c-info pd-10">
                    <img :src="gdInfo.creator.cover" width="35" height="35" alt="">
                    <a class="c-uploader" @click="$router.push('/user/home/1234')">{{gdInfo.creator.nickname}}</a>
                    <span class="c-ct">{{gdInfo.createtime}} 创建</span>
                </p>
                <p class="pd-10">
                    <Button icon="social-youtube-outline" type="primary">播放全部</Button>
                    <Button :disabled="gdInfo.creator._id === userId" icon="ios-briefcase-outline" type="ghost">收藏歌单(234)</Button>
                </p>
                <p class="pd-10" v-if="gdInfo.label.length > 0">标签：
                    <Tag v-for="label in gdInfo.label">{{label}}</Tag>
                </p>
                <p v-if="gdInfo.desc">介绍：{{gdInfo.desc}}</p>
                <Button icon="compose" @click="$router.push('/my/music/edit/' + gdInfo._id)" class="edit-btn" type="text">编辑</Button>
            </div>
        </div>
        <div class="list" v-if="gdInfo">
            <h2>歌曲列表（{{gdInfo.songs.length}}首）</h2>
            <Table highlight-row stripe :columns="plColumn" :data="gdInfo.songs"></Table>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                plColumn: [
                    {
                        type: 'index',
                        width: 50
                    },
                    {
                        title: '歌名',
                        key: 'name'
                    },
                    {
                        title: '艺人',
                        key: 'singer'
                    },
                    {
                        title: '上传者',
                        render(h, params) {
                            return h(
                                'a',
                                {
                                    'class': {
                                        upl: true
                                    },
                                    on: {
                                        click(e) {
                                            console.log(e);
                                        }
                                    }
                                },
                                params.row.uploader.nickname
                            );
                        }
                    }
                ],
                data: [],
                gdInfo: null,
                userId: sessionStorage.getItem('userInfo')
            }
        },
        created() {
            this.$http.get('/api/findGDById?id=' + this.$route.params.id).then(response => {
                this.gdInfo = response.body.result;
                this.gdInfo.cover = 'http://localhost:3000' + response.body.result.cover.replace('public', '');
                this.gdInfo.creator.cover = 'http://localhost:3000' + response.body.result.creator.cover.replace('public', '');
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.$http.get('/api/findGDById?id=' + to.params.id).then(response => {
                this.gdInfo = response.body.result;
                this.gdInfo.cover = 'http://localhost:3000' + response.body.result.cover.replace('public', '');
                this.gdInfo.creator.cover = 'http://localhost:3000' + response.body.result.creator.cover.replace('public', '');
            });
            next();
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .pl-wrap
        text-align left
        margin 0 50px
        .cnt
            margin 30px 0 30px 0
            .c-left
                width 210px
                position absolute
            .c-right-2
                width 100%
                padding-left 230px
                display inline-block
                .pd-10
                    margin-bottom 10px
                .c-title
                    font-size 18px
                .c-info
                    vertical-align middle
                    img
                        border-radius 3px
                    .c-uploader
                        padding-left 15px
                        &:hover
                            text-decoration underline
                    .c-ct
                        padding-left 15px
                        color #aaa
                .edit-btn
                    position absolute
                    font-size 16px
                    top 30px
                    right 70px

        .list
            margin-top 80px
            h2
                font-size 18px

    .upl
        &:hover
            text-decoration underline
</style>


