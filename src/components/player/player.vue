<template>
    <div>
        <audio v-if="cmusic" ref="audio" controls="controls" 
            style="position: fixed;left: 0; top: 0;z-index: -1;display: none;" 
            @timeupdate="timeupdate" 
            @progress="audioProgress"
            @loadstart="loadstart"
            @loadeddata="loadeddata"
            @loadedmetadata="loadedmetadata"
            @ended="ended"
            @canplay="canplay">

            <source :src="cmusic.src" type="audio/mpeg">
            Your browser does not support the audio tag.
        </audio>
    </div>
</template>

<script>
// import $com from '../../assets/script/common.js';
export default {
    props: ['emit', 'playerInfo'],
    data() {
        return {
            duration: 0,
            sList: []
        }
    },
    computed: {
        cmusic() {
            let _c = this.$store.getters['cmusic'];
            if (!_c.cover.startsWith('http')) {
                _c.cover = 'http://localhost:3000/' + _c.cover.replace('public/', '');
            }
            if (!_c.src.startsWith('http')) {
                 _c.src = 'http://localhost:3000/' + _c.src.replace('public/', '');
            }
            return _c;
        },
        progress() {
            return this.$store.getters['progress'];
        }
    },
    mounted() {
        this.$refs['audio'].volume = this.playerInfo.voice / 100;
    },
    methods: {
        /**
        * @description audio可以播放时
        */
        loadstart(e) {
            console.log('loadstart ....', e)
        },
        loadeddata() {
            console.log('loadeddata ....')
        },
        loadedmetadata() {
            console.log('loadedmetadata ....')
        },
        ended() {
            this.emit.$emit('ended', true);
        },
        canplay(e) {
            this.duration = Math.floor(e.target.duration);
            this.emit.$emit('loadSuccess', {
                duration: this.duration
            });
        },
        audioProgress(e) {
            console.log('progress...');
        },
        /**
            @description 进度发生改变
            */
        timeupdate(e) {
            this.emit.$emit('progress', Math.floor(e.target.currentTime));
        }
    },
    watch: {
        'playerInfo.paused'(now) {
            if (now) {
                this.$refs['audio'].pause();
            } else {
                this.$refs['audio'].play();
            }
        },
        'playerInfo.voice'(now) {
            this.$refs['audio'].volume = now / 100;
        },
        'cmusic'(now) {
            this.$refs['audio'].load();
            this.$refs['audio'].play();
        },
        'progress'(progress) {
            this.$refs['audio'].currentTime = progress;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
