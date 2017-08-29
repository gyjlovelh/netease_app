<template>
    <div class="mv-wrap">
        <Form :model="result" :label-width="80">
            <Form-item label="添加MV" class="mv-add">
                <Upload 
                    :before-upload="beforeMvUpload"
                    action="/file">
                    <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传的MV文件</Button>
                </Upload>
                <div v-if="result.src">待上传文件{{result.src.name}}</div>
            </Form-item>
            <Form-item label="名称">
                <Input v-model="result.name" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="艺人">
                <Input v-model="result.singer" placeholder="请输入"></Input>
            </Form-item>
            <Form-item label="描述">
                <Input v-model="result.desc" type="textarea" :rows="4" placeholder="请输入"></Input>
            </Form-item>
            <Form-item>
                <Button type="info" long @click="formSubmit">确认上传</Button>
            </Form-item>
        </Form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            result: {
                name: '',
                src: '',
                singer: '',
                desc: ''
            }
        }
    },
    methods: {
        beforeMvUpload(file) {
            console.log(file);
            if (file.type !== 'video/mp4') {
                this.$Notice.error({
                    title: '请上传正确文件',
                    desc: '目前只支持mp4音乐文件~',
                    duration: 5
                });
                return false;
            }
            let _name = file.name;
            if (_name.includes('-')) {
                let str = _name.split('-');
                if (str.length === 2) {
                    this.result.singer = str[0].trim();
                    this.result.name = str[1].trim().replace('.mp4', '');
                }
            }
            this.result.src = file;
            return false;
        },
        formSubmit() {
            var userId = sessionStorage.getItem('userInfo');
            if (!userId) {
                this.$Notice.error({
                    title: '对方不想说话！',
                    desc: '请登录后再上传歌曲~'
                });
                return;
            }
            var formData = new FormData();
            formData.append('name', this.result.name);
            formData.append('uploader', userId);
            formData.append('singer', this.result.singer);
            formData.append('src', this.result.src);
            formData.append('desc', this.result.desc);
            this.$http.post('/api/upload/mv', formData).then(response => {
                console.log(response.body);
                if (response) {
                    this.image = null;
                    this.result = {
                        name: '',
                        singer: '',
                        desc: '',
                        src: null
                    }
                    this.$Message.success({
                        content: '上传成功！'
                    });
                }
            });
        }
    }
}
</script>

<style lang="stylus" scoped>
    .mv-wrap
        width 80%
        min-width 500px
        margin 30px auto
        .mv-add
            text-align left 
</style>
