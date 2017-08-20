/**
 *   Created by guanyj on 2017/8/19
 */
<template>
    <div class="upload-wrap">
        <template>    
            <Form :model="result" :label-width="80">
                <Form-item label="歌名">
                    <Input v-model="result.name" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="歌手">
                    <Input v-model="result.singer" placeholder="请输入"></Input>
                </Form-item>
                <Form-item label="选择分类" style="text-align: left;">
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
                                            :class="{'tag-on': result.tags.includes(tag.id)}" 
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
                </Form-item>
                <Form-item label="上传封面" class="u-cover">
                    <div class="selected-cover" v-if="image">
                        <img :src="image" >
                        <div class="vord-cover">
                            <Icon type="ios-eye-outline" @click="isCoverShow = true"></Icon>
                            <Icon type="ios-trash-outline" @click="isCoverShow = true"></Icon>
                        </div>
                    </div>
                    <Upload
                        ref="upload"
                        enctype="multipart/form-data"
                        :headers="{enctype: 'multipart/form-data'}"
                        :show-upload-list="false"
                        :max-size="2048"
                        :format="['jpg','jpeg','png']"
                        :before-upload="beforeCoverUpload"
                        type="drag"
                        action="/file"
                        style="display: inline-block;width:58px;">
                        <div style="width: 58px;height:58px;line-height: 58px;">
                            <Icon type="camera" size="20"></Icon>
                        </div>
                    </Upload>
                </Form-item>
                <Form-item label="添加歌曲" class="u-add">
                    <Upload 
                        action="/file"
                        :before-upload="beforeSrcUpload"
                        @on-progress="progress">
                        <Button type="ghost" icon="ios-cloud-upload-outline">选择要上传的音乐文件</Button>
                    </Upload>
                    <div v-if="result.src">待上传文件{{result.src.name}}</div>
                </Form-item>
                <Form-item>
                    <Button type="info" long @click="formSubmit">确认上传</Button>
                </Form-item>
            </Form>
        </template>
        <template>
            <Modal title="查看图片" v-show="isCoverShow">
                <img :src="image">
            </Modal>
        </template> 
    </div>                  
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                image: null,
                isCoverShow: false,
                result: {
                    name: '',   // 歌名
                    singer: '', // 歌手
                    cover: '',  // 封面
                    tags: [],
                    src: null
                },
                types: [],
                isTagsShow: false
            }
        },
        created() {
            this.$http.get('/api/types').then(response => {
                console.log(response)
                this.types = response.body.result;
            });
        },
        computed: {
            tagses() {
                let temp = [];
                this.result.tags.forEach(tag => {
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
                if (this.result.tags.length >= 4) {
                    this.$Message.warning('最多添加四个标签~');
                    return;
                }
                if (!this.result.tags.includes(id)) {
                    this.result.tags.push(id);
                }
            },
            removeTag(id) {
                this.result.tags = this.result.tags.filter(item => {
                    return item !== id;
                });
            },
            formSubmit() {
                console.log(this.result);
                var formData = new FormData();
                formData.append('name', this.result.name);
                formData.append('singer', this.result.singer);
                formData.append('cover', this.result.cover);
                formData.append('types', JSON.stringify(this.result.tags));
                formData.append('src', this.result.src);

                this.$http.post('/api/upload/song', formData).then(response => {
                    console.log(response);
                });
            },
            beforeSrcUpload(file) {
                this.result.src = file;
                return false;
            },
            beforeCoverUpload(file) {
                this.result.cover = file;
                let url = window.URL.createObjectURL(file);
                this.image = url;
                return false;
            },
            progress(e, f, fs) {
                console.log(e, f, fs);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .upload-wrap
        width 80%
        min-width 500px
        margin 30px auto
        .u-cover, .u-add
            text-align left  
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
        .selected-cover
            border: 1px solid #ccc;
            background #fff
            border-radius: 3px;
            display: inline-block;
            position relative
            float: left;
            margin-right: 20px;
            height: 52px;   
            width: 52px;
            img
                border none 
                display block
                height 48px
                width 48px 
                position relative
                left 1px
                top 1px
            .vord-cover
                display none
                position absolute
                left 0
                top 0
                right 0
                bottom 0
                background rgba(0,0,0,.6)
                text-align center
                line-height 48px
                .ivu-icon
                    color #fff
                    cursor pointer
                    font-size 20px
            &:hover
                .vord-cover 
                    display block   
</style>
