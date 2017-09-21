<template>
    <div class="floor-wrap">
        <div class="tool">
            <Checkbox v-model="isDrawing">绘制区域</Checkbox>
            <Checkbox disabled v-model="isMoving">移动中</Checkbox>
        </div>
        <div class="floor-bg"></div>
        <div id="floorArea" class="floor-area">
            <div v-if="room.editing" id="dedit" class="room-edit"
                 :style="{width: room.size.width + 'px',height: room.size.height + 'px',left: room.position.left + 'px', top: room.position.top + 'px','line-height': room.size.height + 'px'}">
                {{room.name}}
            </div>
            <div class="room-item"
                 v-for="(item, index) in rooms"
                 v-bind:id="'room_' + index"
                 @dblclick="$router.push('/other/room/' + item._id)"
                 :class="{'room-on': selectedRoomIndex == index}"
                 :style="{width: item.size.width + 'px',height: item.size.height + 'px',left: item.position.left + 'px', top: item.position.top + 'px','line-height': item.size.height + 'px'}">
                {{item.name}}
            </div>
            <Icon v-if="btn.left !== 0" id="dbtn" class="room-btn" :style="{left: btn.left + 'px', top: btn.top + 'px'}" type="navicon-round"></Icon>
        </div>
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutRight">
            <div v-if="selectedRoomIndex !== 9999" class="room-panel">
                <Form :model="currentRoom" label-position="right" :label-width="70">
                    <FormItem label="区域名称">
                        <Input v-model="currentRoom.name"></Input>
                    </FormItem>
                    <FormItem label="区域高">
                        <Input v-model="currentRoom.height" :disabled="currentRoom._id && currentRoom._id.length > 5">
                            <span slot="append">米</span>
                        </Input>
                        <!--<Slider v-model="currentRoom.height" @on-input="setRoomHeight" :min="0" :max="50" :step="1" show-input></Slider>-->
                    </FormItem>
                    <FormItem label="区域宽">
                        <Input v-model="currentRoom.width" :disabled="currentRoom._id && currentRoom._id.length > 5">
                            <span slot="append">米</span>
                        </Input>
                        <!--<Slider v-model="currentRoom.width" @on-input="setRoomWidth" :min="0" :max="50" :step="1" show-input></Slider>-->
                    </FormItem>
                    <FormItem v-if="currentRoom._id && currentRoom._id.length > 5">
                        <Button @click="updateRoom" type="info">提交修改</Button>
                        <Button @click="deleteRoom" type="warning">删除</Button>
                    </FormItem>
                    <FormItem v-else>
                        <Button @click="createRoom" type="info" long>确认</Button>
                    </FormItem>
                </Form>
            </div>
        </transition>
    </div>
</template>

<script type="text/ecmascript-6">
    import $ from 'jquery';
    export default {
        data() {
            return {
                isDrawing: false, // 是否可以绘制
                isMoving: false, // 是否正在移动
                isResizing: false, // 是否正在改变大小
                rooms: [],
                room: {
                    editing: false,
                    id: '',
                    name: '',
                    position: {
                        left: 0,
                        top: 0
                    },
                    size: {
                        width: 0,
                        height: 0
                    }
                },
                area: {
                    left: 0,
                    top: 0
                },
                btn: {
                    left: 0,
                    top: 0
                },
                editInfo: {
                    left: 0,
                    top: 0
                },
                currentRoom: {
                    name: '',
                    width: 0,
                    height: 0
                },
                selectedRoomIndex: 9999
            }
        },
        created() {
            this.$http.get('/api/findAllRoom').then(response => {
                console.log('response', response);
                this.rooms = response.body.result;
            });
        },
        mounted() {
            $('#floorArea').on('mousedown', e => {
                this.area.left = $('#floorArea').offset().left;
                this.area.top = $('#floorArea').offset().top;
                let _id = e.target.id;
                /**
                 * 点到空白  开始绘图
                 */
                if (_id === 'floorArea' && this.isDrawing) {
                    this.room.editing = true;
                    let _offsetX, _offsetY;
                    if (e.target.id === 'floorArea') {
                        _offsetX = e.offsetX;
                        _offsetY = e.offsetY;
                    } else {
                        _offsetX = e.offsetX + e.target.offsetLeft;
                        _offsetY = e.offsetY + e.target.offsetTop;
                    }
                    this.room.name = 'room_' + Math.round(Math.random() * 100);
                    this.room.position.left = Math.round(_offsetX);
                    this.room.position.top = Math.round(_offsetY);
                } else if (_id.includes('room')) {
                    /**
                     * 点到模型
                     */
                    this.selectedRoomIndex = _id.split('_')[1];
                    this.isMoving = true;
//                    this.isCheckModule = true;
                    this.editInfo.left = e.offsetX;
                    this.editInfo.top = e.offsetY;
                    let _m = this.rooms[this.selectedRoomIndex];
                    if (!_m._id) {
                        this.btn.left = _m.position.left + _m.size.width - 5;
                        this.btn.top = _m.position.top + _m.size.height - 5;
                    } else {
                        this.btn.left = 0;
                        this.btn.top = 0;
                    }
                    this.currentRoom.name = _m.name;
                    this.currentRoom.width = _m.width;
                    this.currentRoom._id = _m._id;
                    this.currentRoom.height = _m.height;
                } else if (_id === 'dbtn') {
                    /**
                     *  点到拖拽按钮上
                     */
                    this.isResizing = true;
                } else {
                    /**
                     *  点到空白
                     */
                    this.isDrawing = false;
                    this.isMoving = false;
                    this.selectedRoomIndex = 9999;
                    this.btn.left = 0;
                    this.btn.top = 0;
                }
            });
            $(document).on('mouseup', e => {
                if (this.room.editing) {
                    let isOk = true;
                    if (this.room.size.width < 30 || this.room.size.height < 30) {
                        isOk = false;
                    }
                    if (isOk) {
                        let temp = {
                            name: this.room.name,
                            size: {
                                width: this.room.size.width,
                                height: this.room.size.height
                            },
                            position: {
                                left: this.room.position.left,
                                top: this.room.position.top
                            },
                            editing: false
                        };
                        this.rooms.push(temp);
                    }
                    this.room = {
                        name: '',
                        editing: false,
                        size: {
                            width: 0,
                            height: 0
                        },
                        position: {
                            left: 0,
                            top: 0
                        }
                    };
                }
                this.room.editing = false;
                this.isDrawing = false;
                this.isMoving = false;
                this.isResizing = false;
            });
            $(document).on('mousemove', (e) => {
                /**
                 * 是否可以绘制
                 */
                if (this.room.editing) {
                    let _offsetX, _offsetY;
                    if (e.target.id === 'floorArea') {
                        _offsetX = e.offsetX;
                        _offsetY = e.offsetY;
                    } else {
                        _offsetX = e.offsetX + e.target.offsetLeft;
                        _offsetY = e.offsetY + e.target.offsetTop;
                    }
                    this.room.size.width = Math.round(_offsetX - this.room.position.left);
                    this.room.size.height = Math.round(_offsetY - this.room.position.top);
                } else if (this.isResizing && !this.rooms[this.selectedRoomIndex]._id) {
                    /**
                     * 改变模型大小
                     */
                    let _offsetX, _offsetY;
                    if (e.target.id === 'floorArea') {
                        _offsetX = e.offsetX;
                        _offsetY = e.offsetY;
                    } else {
                        _offsetX = e.offsetX + e.target.offsetLeft;
                        _offsetY = e.offsetY + e.target.offsetTop;
                    }
                    let _m = this.rooms[this.selectedRoomIndex];
                    _m.size.width = Math.round(_offsetX - _m.position.left);
                    _m.size.height = Math.round(_offsetY - _m.position.top);
                    this.btn.left = _m.position.left + _m.size.width - 5;
                    this.btn.top = _m.position.top + _m.size.height - 5;

                    this.currentRoom.name = _m.name;
                    this.currentRoom._id = _m._id;
                    this.currentRoom.width = _m.width;
                    this.currentRoom.height = _m.height;
                } else if (this.isMoving && !this.rooms[this.selectedRoomIndex]._id) {
                    /**
                     * 改变模型位置
                     * @type {boolean}
                     */
//                    this.isCheckModule = false;
                    let _m = this.rooms[this.selectedRoomIndex];
                    _m.position.left = Math.round(e.pageX - this.editInfo.left - this.area.left);
                    _m.position.top = Math.round(e.pageY - this.editInfo.top - this.area.top);

                    if (_m.position.left < 0) {
                        _m.position.left = 0;
                    }
                    if (_m.position.top < 0) {
                        _m.position.top = 0;
                    }
                    this.btn.left = _m.position.left + _m.size.width - 5;
                    this.btn.top = _m.position.top + _m.size.height - 5;
                }
            });
        },
        methods: {
            createRoom() {
                let data = {
                    name: this.currentRoom.name,
                    width: this.currentRoom.width,
                    height: this.currentRoom.height,
                    size: this.rooms[this.selectedRoomIndex].size,
                    position: this.rooms[this.selectedRoomIndex].position
                };
                this.$http.post('/api/createRoom', data).then(response => {
                    this.rooms = response.body.result;
                });
            },
            updateRoom() {
                let data = {
                    _id: this.currentRoom._id,
                    name: this.currentRoom.name,
                    width: this.currentRoom.width,
                    height: this.currentRoom.height,
                    size: this.rooms[this.selectedRoomIndex].size,
                    position: this.rooms[this.selectedRoomIndex].position
                };
                this.$http.post('/api/updateRoom', data).then(response => {
                    this.rooms = response.body.result;
                });
            },
            deleteRoom() {
                this.$http.post('/api/deleteRoom', {_id: this.currentRoom._id}).then(response => {
                    this.rooms = response.body.result;
                });
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .floor-wrap
        position relative
        .tool
            position relative
            text-align left
            padding 5px 10px
            height 50px
            width 90%
            border 1px solid #ccc
            margin 10px auto
        .floor-bg
            position absolute
            left 50%
            margin-left -450px
            height 600px
            width 900px
            border 1px solid #ccc
            background-image url('./flow.jpeg');
            background-size 900px 600px
        .floor-area
            position absolute
            left 50%
            margin-left -450px
            height 600px
            width 900px
            border 1px solid #ccc
            background rgba(249, 217, 128, 0.26)
            .room-edit
                border 1px solid green
                position absolute
            .room-item
                border 1px solid #5fab8f
                cursor pointer
                background rgba(143, 230, 222, 0.72)
                position absolute
                user-select none
            .room-on
                background rgba(212, 191, 45, 0.72)
                box-shadow 0 0 7px 0 #b96916
            .room-btn
                position absolute
                right -5px
                bottom -5px
                cursor nwse-resize
                height 10px
                width 10px
        .room-panel
            position fixed
            border 1px solid #ccc
            background #fff
            right 20px
            top 100px
            width 220px
            height 300px
</style>


