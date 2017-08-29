<template>
    <div>
        <Tabs>
            <Tab-pane label="音乐">       
                <Table highlight-row stripe :columns="musicColumns" @on-row-dblclick="selectSong" :data="musics"></Table>
            </Tab-pane>
            <Tab-pane label="MV"></Tab-pane>
            <Tab-pane label="歌单"></Tab-pane>
        </Tabs>
    </div>
</template>

<script>
import uploaderRender from './renders/uploaderRender.vue';
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
            ]
        }
    },
    created() {
        this.$http.get('/api/songs').then(response => {
            this.musics = response.body.result;
        });
    },
    methods: {
        'selectSong'(p) {
            this.$store.commit('SELECT_SONG', p);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>

