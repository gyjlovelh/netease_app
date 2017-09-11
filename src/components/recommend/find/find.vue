<template>
    <div class="find-wrap">
        <Tabs>
            <Tab-pane label="音乐">
                <Table highlight-row stripe :columns="musicColumns" @on-row-dblclick="selectSong" :data="musics"></Table>
            </Tab-pane>
            <Tab-pane label="MV">
                <Table highlight-row stripe :columns="mvColumns" @on-row-dblclick="selectMv" :data="mvs"></Table>
            </Tab-pane>
            <Tab-pane label="歌单">
                <div class="gd-wrap">
                    <h2>所有歌单</h2>
                    <gd-list :items="playlistes" :isAuthorShow="true"></gd-list>
                </div>
            </Tab-pane>
        </Tabs>
    </div>
</template>

<script>
import uploaderRender from './renders/uploaderRender.vue';
import gdList from '../../common/gdList.vue';
export default {
    data() {
        return {
            musics: [],
            musicColumns: [
                {
                    type: 'index',
                    width: 50
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '艺人',
                    key: 'singer'
                },
                {
                    title: '上传者',
                    render(h, params) {
                        return h(uploaderRender, {
                            props: {
                                uploader: params.row.uploader
                            }
                        });
                    }
                },
                {
                    title: '类型',
                    key: 'types'
                },
                {
                    title: '上传时间',
                    key: 'createtime'
                }
            ],
            mvs: [],
            mvColumns: [
                {
                    type: 'index',
                    width: 50
                },
                {
                    title: '名称',
                    key: 'name'
                },
                {
                    title: '艺人',
                    key: 'singer'
                },
                {
                    title: '上传者',
                    render(h, params) {
                        return h(uploaderRender, {
                            props: {
                                uploader: params.row.uploader
                            }
                        });
                    }
                },
                {
                    title: '上传时间',
                    key: 'createtime'
                },
                {
                    title: '描述',
                    key: 'desc'
                }
            ],
            playlistes: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    },
    components: {
        gdList
    },
    created() {
        this.$http.get('/api/songs').then(response => {
            this.musics = response.body.result;
        });
        this.$http.get('/api/getAllMv').then(response => {
            this.mvs = response.body.result;
        });
        this.$http.get('/api/findAllGD').then(response => {
             this.playlistes = response.body.result;
        });
    },
    methods: {
        'selectSong'(p) {
            this.$store.commit('SELECT_SONG', p);
        },
        'selectMv'(p) {
            this.$router.push('/mv/' + p._id);
        },
        'toPlayList'(p) {
            this.$router.push('/playlist/' + p);
        }
    }
}
</script>

<style lang="stylus" scoped>
.find-wrap
    width 940px
    border 1px solid #ccc
    padding 20px 50px
    margin 0 auto
    .gd-wrap
        text-align left
        h2
            border-bottom 2px solid #c20c0c
            font-size 18px
</style>

