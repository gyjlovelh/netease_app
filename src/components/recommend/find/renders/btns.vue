<template>
    <div class="btns-wrap">
        <Button @click="openStoreList" type="text"><Icon type="ios-medkit" :size="20"></Icon></Button>
        <!--<Button type="text"><Icon type="ios-trash" :size="20"></Icon></Button>-->
        <Modal v-model="isStoreShow" :mask-closable="false">
            <p slot="header">
                <Icon type="ios-medkit"></Icon>
                <span>添加到歌单</span>
            </p>
            <div>
                <ul>
                    <li class="gd-item" v-for="gd in gdses" @click="store(gd._id)">
                        <img class="gd-img" :src="gd.cover" width="40" height="40" alt="">
                        <p class="gd-p">{{gd.name}}</p>
                        <p class="gd-p">{{gd.songs.length}} 首</p>
                    </li>
                </ul>
            </div>
            <p slot="footer"></p>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        props: ['params'],
        data() {
            return {
                isStoreShow: false,
                gds: []
            }
        },
        created() {
            this.$http.get('/api/findGDByUserId?id=' + sessionStorage.getItem('userInfo')).then(response => {
                this.gds = response.body.result;
            });
        },
        computed: {
            gdses() {
                let temp = [];
                this.gds.forEach(gd => {
                    gd.cover = 'http://localhost:3000' + gd.cover.replace('public', '');
                    temp.push(gd);
                });
                return temp;
            }
        },
        methods: {
            openStoreList() {
                console.log(this.params);
                this.isStoreShow = true;
            },
            store(id) {
                let data = {
                    _id: id,
                    songs: this.params._id
                };
                this.$http.post('/api/addSongToGD', data).then(response => {
                    console.log(response);
                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .btns-wrap
        position relative
    .gd-item
        height 60px
        padding 10px 0
        border-bottom 1px solid #ccc
        cursor pointer
        &:hover
            background #f2f2f2
        .gd-img
            margin 0 15px
            position absolute
            left 20px
        .gd-p
            margin-left 80px
</style>


