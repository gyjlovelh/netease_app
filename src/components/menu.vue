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
                            <router-link to="/recommend/mv">
                                <Menu-item name="0-2">
                                    <Icon class="m-icon" type="social-youtube-outline" :size="17"></Icon>
                                    MV
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
                                    我的上传
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/article">
                                <Menu-item name="1-2">
                                    <Icon class="m-icon" type="android-contact" :size="20"></Icon>
                                    艺人
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/mv">
                                <Menu-item name="1-3">
                                    <Icon class="m-icon" type="social-youtube-outline" :size="17"></Icon>
                                    我的MV
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
                                <Button class="create-playlist" type="ghost" shape="circle" icon="plus-round" size="small"></Button>
                            </template>
                            <router-link to="/my/playlist/favorite">
                                <Menu-item name="2-1">
                                    <Icon class="m-icon" type="android-favorite" :size="18"></Icon>
                                    我的最爱
                                </Menu-item>
                            </router-link>
                            <router-link to="/my/playlist?id=345423">
                                <Menu-item name="2-2">
                                    <Icon class="m-icon" type="headphone" :size="18"></Icon>
                                    代码资源
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
                    </Menu>
                </Col>
            </Row>
        </template>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {}
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
