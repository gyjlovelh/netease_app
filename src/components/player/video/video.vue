<template>
    <div>
        <video v-if="src" controls width="800">
            <source :src="srces" type="video/mp4">
        </video>
    </div>
</template>

<script>
export default {
    props: ['src'],
    computed: {
        srces() {
            let _src = ('http://localhost:3000' + this.src).replace('public', '');
            console.log(_src);
            return _src;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
