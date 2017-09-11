<template>
    <div class="setting-wrap">
        <transition v-if="!isChangePhoto" enterActiveClass="animated jello" leaveActiveClass="animated bounceOutLeft">
            <Form class="form-wrap" :label-width="100">
                <FormItem label="昵称：">
                    <Input v-model="form.nickname"></Input>
                </FormItem>
                <FormItem label="介绍：">
                    <Input :rows="5" type="textarea" v-model="form.desc"></Input>
                    <span class="desc" :class="{'overflow': form.desc.length > 140}">{{form.desc.length}}/140</span>
                </FormItem>
                <FormItem label="性别：">
                    <RadioGroup type="button" v-model="form.sex">
                        <Radio :label="1">男</Radio>
                        <Radio :label="2">女</Radio>
                        <Radio :label="3">未知</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="生日：">
                    <DatePicker type="date" :value="form.birthday" placeloader="选择日期"></DatePicker>
                </FormItem>
                <FormItem label="地区：">
                    <Cascader :data="data" v-model="form.area"></Cascader>
                </FormItem>
                <FormItem>
                    <Button @click="updateSetting" type="primary" long>保存</Button>
                </FormItem>
            </Form>
        </transition>
        <div v-if="!isChangePhoto" class="p-area">
            <img :src="form.cover" width="140" height="140" alt="">
            <Button @click="isChangePhoto = true" type="ghost" long>更换头像</Button>
        </div>
        <transition v-if="isChangePhoto" enterActiveClass="animated jello" leaveActiveClass="animated bounceOutLeft">
            <div class="p-set">
                <Upload class="upl" action="aaaa" :before-upload="beforeUpload">
                    <Button type="ghost" long>上传头像</Button>
                    <span>支持jpg/png格式的图片，且文件小于5M</span>
                </Upload>
                <vueCropper class="crop"
                            ref="cropper"
                            :img="edit.image"
                            :outputSize="1"
                            @realTime="realTime"
                            :outputType="'jpg'" :autoCrop="false">

                </vueCropper>
                <div class="btn">
                    <Button @click="savePhoto" type="info">保存</Button>
                    <Button @click="cancelPhoto" type="ghost">取消</Button>
                </div>
                <div class="yl">
                    <h4 style="margin-bottom: 20px">头像预览</h4>
                    <img :src="edit.image2" width="180" height="180" alt="">
                    <p class="tp-t">大尺寸头像（180x180像素）</p>
                    <img :src="edit.image2" width="40" height="40" alt="">
                    <p class="tp-t">小尺寸头像（40x40像素）</p>
                </div>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import VueCropper from 'vue-cropper';
    import provinces from './allprovinces.json';
    export default {
        data() {
            return {
                isChangePhoto: false,
                previews: null,
                edit: {
                    image: 'http://localhost:8080/static/default_cover.png',
                    image2: ''
                },
                form: {
                    name: '',
                    desc: '',
                    sex: 3,
                    birthday: new Date(),
                    area: [],
                    cover: null
                },
                cover: null,
                data: []
            }
        },
        components: {
            VueCropper
        },
        created() {
            let cUser = sessionStorage.getItem('userInfo');
            this.$http.post('/api/findUserById', {id: cUser}).then(response => {
                console.log(response.body);
                this.form = response.body.result;
                this.form.cover = 'http://localhost:3000/' + response.body.result.cover.replace('public', '');
                this.edit.image2 = this.form.cover;
            });
            provinces['provincesList'].forEach(province => {
                let temp = {
                    value: province.Id,
                    label: province.Name,
                    children: []
                };
                province['Citys'].forEach(city => {
                    temp.children.push({
                        value: city.Id,
                        label: city.Name
                    });
                });
                this.data.push(temp);
            });
        },
        methods: {
            'beforeUpload'(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    this.$Notice.error({
                        title: '请上传正确文件',
                        desc: '由于开发者很懒，未做各种图片的兼容问题，目前支持png/jpg/jpeg三种图片文件~',
                        duration: 5
                    });
                }
                this.cover = file;
                this.edit.image = window.URL.createObjectURL(file);
                this.edit.image2 = this.edit.image;
                this.$refs['cropper'].startCrop();
                return false;
            },
            'realTime'() {
                if (this.edit.image !== 'http://localhost:8080/static/default_cover.png') {
                    this.$refs['cropper'].getCropData((data) => {
                        this.edit.image2 = data;
                    });
                }
            },
            'savePhoto'() {
//                this.$refs['cropper'].getCropData((data) => {
//                    let reader = new FileReader();
//                    reader.onload = function (event) {
//                        console.log('txt', event.target.result);
//                    };
//                    reader.readAsDataURL(this.image);
//                });
//                console.log(this.cover);
                let formData = new FormData();
                formData.append('id', sessionStorage.getItem('userInfo'));
                formData.append('cover', this.cover);
                this.$http.post('/api/upload/userCover', formData).then(response => {
                    if (response.body.result) {
                        this.$router.push('/user/home/' + sessionStorage.getItem('userInfo'));
                    }
                });
            },
            'cancelPhoto'() {
                this.edit = {
                    image: 'http://localhost:8080/static/default_cover.png',
                    image2: this.form.cover
                };
                this.$refs['cropper'].clearCrop();
                this.isChangePhoto = false;
            },
            'updateSetting'() {
                console.log(this.form);
                this.$http.post('/api/updateUser', this.form).then(response => {
                    console.log(response);
                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .setting-wrap
        width 940px
        position relative
        border 1px solid #ccc
        padding 20px 0px
        margin 0 auto
        .form-wrap
            width 500px
            margin-top 30px
            text-align left
            .desc
                position absolute
                color #aaa
                right 0px
                bottom 0px
            .overflow
                color darkred
        .p-area
            position absolute
            top 30px
            right 120px
        .p-set
            position: relative
            text-align left
            .crop
                margin-left 30px
                margin-bottom 30px
                width 320px
                height 320px
            .btn
                margin-left 30px
                .ivu-btn
                    width 100px
                    margin-right 20px
            .upl
                width 240px
                position: relative
                margin-left 30px
                margin-bottom 30px
            .yl
                position: absolute
                padding-left 40px
                border-left 1px solid #ccc
                top 80px
                left 390px
                img
                    border 1px solid #ccc
                .tp-t
                    color #999
                    margin-bottom 20px
</style>


