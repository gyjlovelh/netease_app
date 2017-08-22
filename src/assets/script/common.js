import Vue from 'vue';

window._vueInstance = window._vueInstance || new Vue();

export default {
    $on(event, cb) {
        console.log('event', event);
        window._vueInstance.$off(event);
        window._vueInstance.$on(event, function(p) {
            console.log('p', p);
        });
    },
    $emit(event, value) {
        window._vueInstance.$emit(event, value);
    }
};