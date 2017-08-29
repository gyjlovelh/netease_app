<template>
    <div>
        <template>
            <Table highlight-row stripe :columns="uploadsColumns" @on-row-dblclick="selectSong" :data="uploads"></Table>
        </template>
    </div>  
</template>

<script>
import {mapActions} from 'vuex';
import typesRender from './renders/typesRender.vue';
// import $com from '../../assets/script/common.js';
export default {
    data() {
        return {
            uploads: [],
            allTypes: [],
            uploadsColumns: [
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
                    title: '类型',
                    key: 'types',
                    render(ce, param) {
                        return ce(typesRender, {
                            props: {
                                types: param.row.types
                            }
                        });
                    }
                },
                {
                    title: '上传时间',
                    key: 'createtime'
                },
                {
                    title: '播放次数',
                    key: 'num'
                }
            ]
        }
    },
    created() {
        let cUserId = sessionStorage.getItem('userInfo') || null;
        if (cUserId) {
            this.$http.get('/api/getSongsByUploader?id=' + cUserId).then(response => {
                this.uploads = response.body.result;
            });
        }
    },
    methods: mapActions([
        'selectSong'
    ])
}
</script>

<style lang="stylus" scoped>

</style>


