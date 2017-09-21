/**
 *   Created by guanyj on 2017/7/4
 */
<template>
    <div class="menu-wrap">
        <template>
            <Row>
                <Col span="8">
                    <Menu :theme="'light'" :width="'220px'">
                        <Menu-group style="text-align: left;" title="推荐">
                            <router-link to="/recommend/find">
                                <Menu-item name="0-1">
                                    <Icon class="m-icon" type="ios-musical-notes" :size="20"></Icon>
                                    发现音乐
                                </Menu-item>
                            </router-link>
                            <router-link to="/recommend/friends">
                                <Menu-item name="0-3">
                                    <Icon class="m-icon" type="ios-people" :size="21"></Icon>
                                    朋友
                                </Menu-item>
                            </router-link>
                        </Menu-group>
                        <Menu-group style="text-align: left;" title="资料库">
                            <router-link to="/my/uploads">
                                <Menu-item name="1-1">
                                    <Icon class="m-icon" type="ios-cloud-upload" :size="20"></Icon>
                                    我上传的音乐
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/mv">
                                <Menu-item name="1-3">
                                    <Icon class="m-icon" type="social-youtube-outline" :size="17"></Icon>
                                    我上传的MV
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/article">
                                <Menu-item name="1-2">
                                    <Icon class="m-icon" type="android-contact" :size="20"></Icon>
                                    艺人
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/types">
                                <Menu-item name="1-4">
                                    <Icon class="m-icon" type="social-pinterest-outline" :size="18"></Icon>
                                    类型
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/mst">
                                <Menu-item name="1-4">
                                    <Icon class="m-icon" type="ios-paper" :size="18"></Icon>
                                    最常播放
                                </Menu-item>
                            </router-link>
                        </Menu-group>
                        <Submenu name="2">
                            <template slot="title">
                                创建的歌单
                                <Button class="create-playlist" @click.stop="createPlayList" type="ghost" shape="circle" icon="plus-round" size="small"></Button>
                            </template>
                            <!--<router-link to="/my/playlist/favorite">-->
                                <!--<Menu-item name="2-1">-->
                                    <!--<Icon class="m-icon" type="android-favorite" :size="18"></Icon>-->
                                    <!--我的最爱-->
                                <!--</Menu-item>-->
                            <!--</router-link>-->
                            <router-link v-for="(gd, index) in createGDs" :to="'/my/playlist/' + gd._id">
                                <Menu-item :name="'2-' + (index + 2)">
                                    <Icon class="m-icon" :type="gd.name === '我的最爱'? 'android-favorite': 'headphone'" :size="18"></Icon>
                                    {{gd.name}}
                                </Menu-item>
                            </router-link>
                        </Submenu>
                        <Submenu name="3">
                            <template slot="title">
                                收藏的歌单
                            </template>
                            <router-link to="/my/playlist?id=287677">
                                <Menu-item name="3-1">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    设计师的灵感
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/playlist?id=534545">
                                <Menu-item name="3-2">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    老司机发车了
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/playlist?id=778797">
                                <Menu-item name="3-3">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    电影原音
                                </Menu-item>
                            </router-link>
                        </Submenu>
                        <Submenu name="4">
                            <template slot="title">
                                杂七杂八
                            </template>
                            <router-link to="/my/playlist?id=287677">
                                <Menu-item name="4-1">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    俄罗斯方块
                                </Menu-item>
                            </router-link>
                            <router-link to="/other/floor">
                                <Menu-item name="4-2">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    拖拽绘图
                                </Menu-item>
                            </router-link>
                        </Submenu>
                    </Menu>
                </Col>
            </Row>
        </template>

        <Modal v-model="isCreateGDShow" :mask-closable="false">
            <p slot="header" class="m-header">
                <Icon type="social-pinterest"></Icon>
                新建歌单
            </p>
            <div>
                <Input style="margin-top: 10px" v-model="gdname">
                    <span slot="prepend">歌单名：</span>
                </Input>
                <p style="margin-top: 10px;font-size: 12px">可通过"收藏"将音乐添加到新歌单中</p>
            </div>
            <div slot="footer" style="text-align: left;margin-top: 20px">
                <Button @click="createGeDan" style="width: 70px;" type="info">创建</Button>
                <Button @click="cancelMethod" style="width: 70px;" type="ghost">取消</Button>
            </div>
        </Modal>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                isCreateGDShow: false,
                gdname: '',
                createGDs: []
            }
        },
        created() {
            this.$http.get('/api/findGDByUserId?id=' + sessionStorage.getItem('userInfo')).then(response => {
                this.createGDs = response.body.result;
            });
        },
        methods: {
            /**
             * 创建歌单
             */
            'createPlayList'() {
                this.isCreateGDShow = true;
            },
            'createGeDan'() {
                let userId = sessionStorage.getItem('userInfo');
                if (this.gdname) {
                    this.$http.post('/api/createGeDan', {creator: userId, name: this.gdname}).then(response => {
                        if (response.body.result) {
                            this.createGDs = response.body.result;
                            this.isCreateGDShow = false;
                        }
                    });
                } else {
                    this.$Message.error()
                }
            },
            'cancelMethod'() {
                this.gdname = '';
                this.isCreateGDShow = false;
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
    .menu-wrap
        height 100%
        position absolute
        left 0
        top 0
        bottom 0
        width 220px
        .m-icon
            width 20px
        .create-playlist
            width: 19px;
            height: 19px;
            font-size: 12px;
            color: #999;
            margin-left: 10px;


</style>
