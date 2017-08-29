<template>
    <div>
        <template>
            <Table highlight-row stripe 
                :columns="uploadColumns" 
                @on-row-dblclick="selectSong" 
                :data="uploads">
            </Table>
        </template>
    </div>
</template>

<script>
export default {
    data() {
        return {
            uploadColumns: [
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
                    title: '上传时间',
                    key: 'createtime'
                }
            ],
            uploads: []
        }
    },
    created() {
        let cUserId = sessionStorage.getItem('userInfo') || null;
        if (cUserId) {
            this.$http.get('/api/getMvByUploader?id=' + cUserId).then(response => {
                this.uploads = response.body.result;
            });
        }
    },
    methods: {
        selectSong(param) {
            this.$router.push({path: '/mv/' + param._id});
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
