<template>
    <div>
        <Icon v-show="show" type="volume-medium" :size="22"></Icon>
    </div>
</template>

<script>
export default {
    props: ['row'],
    computed: {
        show() {
            return this.row._id === this.$store.getters['cmusic']._id;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
