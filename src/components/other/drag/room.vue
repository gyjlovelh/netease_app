<template>
    <div id="dwrap" class="wrap">
        <!--<div class="tool">-->
            <!--<Checkbox v-model="isDrawOpen">绘制区域</Checkbox>-->
            <!--<Checkbox v-model="isEditing">移动中</Checkbox>-->
        <!--</div>-->
        <div class="cabinet-model">
            <Menu width="200px">
                <Submenu name="1">
                    <template slot="title">
                        <Icon type="ios-paper"></Icon>
                        机柜
                    </template>
                    <MenuItem name="1-1">
                        <div @mousedown="dragToArea('a', $event)" class="module-item model-a" draggable="true"></div>
                        <span class="model-tip">A机柜 600*1200</span>
                    </MenuItem>
                    <MenuItem name="1-2">
                        <div class="module-item model-b" draggable="true"></div>
                        <span class="model-tip">B机柜 800*1200</span>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <div class="module-item model-c" draggable="true"></div>
                        <span class="model-tip">C机柜 1200*600</span>
                    </MenuItem>
                    <MenuItem name="1-4">
                        <div class="module-item model-d" draggable="true"></div>
                        <span class="model-tip">D机柜 1200*800</span>
                    </MenuItem>
                </Submenu>
            </Menu>
        </div>
        <div id="roomArea" ref="par" class="drag-wrap"></div>
        <div class="drag-bg">
            <ul>
                <li class="d-item" :class="{'b-l': (index + 1) % 5 === 0,'b-b': (index + 1) % 250 > 200 || (index + 1) % 250 === 0}" v-for="(fg, index) in fgs"></li>
            </ul>
        </div>
        <!--<transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">-->
            <!--<div v-if="selectedModuleIndex !== 9999" class="module-panel">-->
                <!--<Form :model="currentModule" label-position="right" :label-width="70">-->
                    <!--<FormItem label="区域名称">-->
                        <!--<Input v-model="currentModule.name">-->
                            <!--<Button slot="append" @click="modules[selectedModuleIndex].name = currentModule.name" type="primary">确认</Button>-->
                        <!--</Input>-->
                    <!--</FormItem>-->
                    <!--<FormItem label="区域高">-->
                        <!--<Slider v-model="currentModule.h" @on-input="setModuleHeight" :min="0" :max="50" :step="1" show-input></Slider>-->
                    <!--</FormItem>-->
                    <!--&lt;!&ndash;<FormItem label="">&ndash;&gt;-->
                    <!--&lt;!&ndash;<Input v-model="currentModule.h" >&ndash;&gt;-->
                    <!--&lt;!&ndash;<span slot="append">米</span>&ndash;&gt;-->
                    <!--&lt;!&ndash;</Input>&ndash;&gt;-->
                    <!--&lt;!&ndash;</FormItem>&ndash;&gt;-->
                    <!--<FormItem label="区域宽">-->
                        <!--<Slider v-model="currentModule.w" @on-input="setModuleWidth" :min="0" :max="50" :step="1" show-input></Slider>-->
                    <!--</FormItem>-->
                <!--</Form>-->
            <!--</div>-->
        <!--</transition>-->
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'jquery';
    export default {
        data() {
            let temp = [];
            for (let i = 0; i < 2500; i++) {
                temp.push(i);
            }
            return {
                fgs: temp
            }
        },
        created() {
            console.log($);
        },
        mounted() {
            $('#moduleArea').on('mouseup', e => {
                let _id = e.target.id;
                if (_id === 'roomArea') {

                }
            });
        },
        methods: {
            dragToArea(param, e) {
                console.log(param, e.offsetX, e.offsetY);
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
.wrap
    position relative
    width 100%
    .cabinet-model
        position absolute
        left 0px
        top 50px
        width 200px
        height 600px
        background #fff
        border 1px solid #ccc
        z-index 999
        text-align center
        .module-item
            background #a3a52d
            margin 10px auto
            cursor pointer
        .model-tip
            font-size 12px
        .model-a
            width 30px
            height 60px
        .model-b
            width 40px
            height 60px
        .model-c
            width 60px
            height 30px
        .model-d
            width 60px
            height 40px
    .tool
        position relative
        text-align left
        padding 5px 10px
        height 50px
        width 100%
        border 1px solid #ccc
        margin 0 auto
    .drag-wrap
        position: absolute
        top 50px
        left 200px
        margin 10px 50px
        width 501px
        height 500px
        border 1px solid #ccc
        z-index 99
        .drag-area
            border 1px solid #5fab8f
            cursor pointer
            background rgba(143, 230, 222, 0.72)
            position absolute
        .area-on
            background rgba(212, 191, 45, 0.72)
            box-shadow 0 0 7px 0 #b96916
        .drag-btn
            position absolute
            right -5px
            bottom -5px
            cursor nwse-resize
            height 10px
            width 10px
        .drag-edit
            border 1px solid green
            position absolute

    .drag-bg
        position: absolute
        top 50px
        left 200px
        margin 10px 50px
        padding 0
        width 502px
        height 500px
        border 1px solid #fff
        text-align left
        font-size 0
        .d-item
            display inline-block
            margin 0
            padding 0
            list-style none
            border-right 1px dashed #ccc
            border-bottom 1px dashed #ccc
            height 10px
            line-height 10px
            width 10px
        .b-l
            border-right 1px solid #999
        .b-b
            border-bottom 1px solid #999
    .module-panel
        position fixed
        border 1px solid #ccc
        right 20px
        top 100px
        width 220px
        height 300px
</style>


