/**
 *   Created by guanyj on 2017/8/19
 */
<template>
    <div>
        <template>
            <Table highlight-row stripe :columns="musicList" :data="songs"></Table>
        </template>
    </div>                  
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                songs: [],
                musicList: [
                    {
                        type: 'index',
                        width: 50
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '时长',
                        key: 'duration'
                    },
                    {
                        title: '歌手',
                        key: 'singer'
                    },
                    {
                        title: '专辑',
                        key: 'album'
                    },
                    {
                        title: '类型',
                        key: 'types'
                    },
                    {
                        title: '播放次数',
                        key: 'num'
                    }
                ]
            }
        },
        created() {
            this.$http.get('/api/songs').then(response => {
                console.log(response);
                this.songs = response.body.result;
            });
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    
</style>
