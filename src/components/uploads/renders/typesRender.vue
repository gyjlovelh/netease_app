<template>
    <div>
        <span v-for="(typ, index) in typeses">{{typ.name}}<em v-if="index !== (types.length - 1)">/</em></span>
    </div>
</template>

<script>
export default {
    props: ['types'],
    data() {
        return {
            allTypes: []
        }
    },
    created() {
        let songTypes = JSON.parse(sessionStorage.getItem('songTypes'));
        songTypes.forEach(item => {
            item.tags.forEach(tag => {
                this.allTypes.push(tag);
            });
        });
    },
    mounted() {
        console.log('mouted.....')
    },
    computed: {
        typeses() {
            let temp = [];
            let _vue = this;
            this.types.forEach(type => {
                temp.push(_vue.allTypes.filter(item => {
                    return item.id === type;
                })[0]);
            });
            return temp;
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
