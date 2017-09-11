<template>
    <div class="edit-wrap">
        <transition v-if="!isChangePhoto" enterActiveClass="animated jello" leaveActiveClass="animated bounceOutLeft">
            <Form ref="form" :model="form" class="form-wrap" :label-width="100" :rules="ruleValidate">
                <FormItem label="歌单名：" prop="name">
                    <Input v-model="form.name" placeholder="请输入"></Input>
                </FormItem>
                <FormItem label="标签：" style="text-align: left;">
                    <Tag v-for="tag in tagses" :key="tag.id" closable @on-close="removeTag(tag.id)">{{tag.name}}</Tag>
                    <Button icon="ios-plus-empty" @click="isTagsShow = !isTagsShow" type="dashed" size="small">添加分类</Button>
                    <Row v-show="isTagsShow" v-if="types.length > 0">
                        <Col>
                            <Card :bordered="true">
                                <div v-for="type in types" :key="type.name">
                                    <p class="types">
                                        <Icon :type="type.cls"></Icon>{{type.name}}
                                    </p>
                                    <div class="tags">
                                        <Button class="tag"
                                                :key="tag.id"
                                                :class="{'tag-on': form.label.includes(tag.id)}"
                                                @click="selectTag(tag.id)"
                                                v-for="tag in type.tags"
                                                type="ghost"
                                                :size="'small'">

                                            {{tag.name}}
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <p>选择合适的标签，最多选择三个</p>
                </FormItem>
                <FormItem label="介绍：">
                    <Input v-model="form.desc" type="textarea" placeholder="请输入" :rows="4"></Input>
                </FormItem>
                <FormItem>
                    <Button @click="handleSubmit('form')" type="primary" long>保存</Button>
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
    export default {
        data() {
            return {
                form: {
                    name: '',
                    desc: '',
                    label: []
                },
                ruleValidate: {
                    name: [
                        {
                            required: true,
                            message: '歌单名不能为空',
                            trigger: 'change'
                        }
                    ]
                },
                edit: {
                    image: 'http://localhost:8080/static/default_cover.png',
                    image2: ''
                },
                isChangePhoto: false,
                types: [],
                isTagsShow: false
            }
        },
        created() {
            this.$http.get('/api/types').then(response => {
                this.types = response.body.result;
            });
            this.$http.get('/api/findGDById?id=' + this.$route.params.id).then(response => {
                console.log(response.body.result);
                this.form = response.body.result;
                this.form.cover = 'http://localhost:3000' + response.body.result.cover.replace('public', '');
                this.edit.image2 = this.form.cover;
            });
        },
        components: {
            VueCropper
        },
        computed: {
            tagses() {
                let temp = [];
                this.form.label.forEach(tag => {
                    this.types.forEach(type => {
                        type.tags.forEach(item => {
                            if (item.id === tag) {
                                temp.push(item);
                            }
                        });
                    });
                });
                return temp;
            }
        },
        methods: {
            selectTag(id) {
                if (this.form.label.length >= 4) {
                    this.$Message.warning('最多添加四个标签~');
                    return;
                }
                if (!this.form.label.includes(id)) {
                    this.form.label.push(id);
                }
            },
            removeTag(id) {
                this.form.label = this.form.label.filter(item => {
                    return item !== id;
                });
            },
            'beforeUpload'(file) {
                if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                    this.$Notice.error({
                        title: '请上传正确文件',
                        desc: '由于开发者很懒，未做各种图片的兼容问题，目前支持png/jpg/jpeg三种图片文件~',
                        duration: 5
                    });
                }
                this.form.cover = file;
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
                let formData = new FormData();
                formData.append('_id', this.$route.params.id);
                formData.append('cover', this.form.cover);
                this.$http.post('/api/upload/gdCover', formData).then(response => {
                    console.log('response', response)
//                    if (response.body.result) {
//                        console.log(response);
//                        this.edit = {
//                            image: 'http://localhost:8080/static/default_cover.png',
//                            image2: this.form.cover
//                        };
//                        this.$refs['cropper'].clearCrop();
//                        this.isChangePhoto = false;
//                    }
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
                this.$http.post('/api/updateUser', this.form).then(response => {
                    console.log(response);
                });
            },
            'handleSubmit'(name) {
                this.$refs[name].validate(valid => {
                    if (valid) {
                        let data = {
                            _id: this.form._id,
                            name: this.form.name,
                            desc: this.form.desc,
                            label: this.form.label
                        };
                        this.$http.post('/api/updateGD', data).then(response => {
                            if (response.body.result) {
                                this.$Message.success('提交成功');
                            }
                        });
                    } else {
                        this.$Message.error('表单验证失败');
                    }
                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .edit-wrap
        width 500px
        margin-top 40px
        min-width 500px
        .types
            color #999
            .ivu-icon
                font-size 14px
                margin-right 5px
        .tags
            padding-left 30px
            .tag
                margin 0 5px
            .tag-on
                color red
        .p-area
            position absolute
            top 30px
            left 550px
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


