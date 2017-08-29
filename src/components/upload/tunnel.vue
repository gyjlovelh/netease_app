<template>
    <div>
        <Tabs>
            <Tab-pane label="上传音乐" icon="ios-musical-notes">
                <app-song></app-song> 
            </Tab-pane>
            <Tab-pane label="上传MV" icon="social-youtube">
                 <app-mv></app-mv>
            </Tab-pane>
        </Tabs>
        <!-- <router-link tag="Button" to="/upload/song">
            上传音乐文件
        </router-link>
        <router-link tag="Button" to="/upload/mv">
            上传MV文件
        </router-link>
        <router-view></router-view> -->
    </div>
</template>

<script>
import mv from './mv.vue';
import song from './song.vue';
export default {
    components: {
        'app-mv': mv,
        'app-song': song
    }
}
</script>

<style lang="stylus" scoped>

</style>
