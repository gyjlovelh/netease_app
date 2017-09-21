<template>
    <div class="chat-wrap">
        <div class="c-item" v-for="ct in chatses">
            <img class="c-cover" :src="ct.user.cover" width="48" height="48" alt="">
            <div class="c-wrap">
                <h4>
                    <a href="javascript:;">{{ct.user.nickname}}</a>
                    <span style="padding-left: 10px">{{ct.createtime}}</span>
                </h4>
                <p style="font-size: 14px;" v-text="ct.msg"></p>
            </div>
        </div>
        <div slot="footer" class="chat-footer">
            <div v-if="userId">
                <Input v-model="chatContent" type="textarea" :rows="3"></Input>
                <span class=""></span>
                <Button @click="submitChat" style="margin-top: 20px" type="info" long>发布聊天</Button>
            </div>
            <div v-else>
                <Button type="warning" long>登录后可以发表聊天</Button>
            </div>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data() {
            return {
                userId: sessionStorage.getItem('userInfo'),
                chats: [],
                ws: null,
                chatContent: ''
            }
        },
        created() {
            this.ws = new WebSocket('ws://localhost:8181');
            this.ws.onmessage = (msg) => {
                this.chats = JSON.parse(msg.data);
            }
        },
        computed: {
            chatses() {
                let temp = [];
                this.chats.forEach(chat => {
                    chat.user.cover = 'http://localhost:3000' + chat.user.cover.replace('public', '');
                    temp.push(chat);
                });
                return temp;
            }
        },
        methods: {
            submitChat() {
                let data = {
                    user: this.userId,
                    msg: this.chatContent
                };
                this.ws.send(JSON.stringify(data));
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .chat-wrap
        position relative
        margin 10px 100px 0 100px
        .c-item
            position relative
            border-bottom 1px solid #ccc
            padding 20px 0px 30px 0
            .c-cover
                position absolute
                top 10px
                left 0px
                border 1px solid #ccc
                border-radius 99px
            .c-wrap
                padding-left 60px
                text-align left
                h4
                    a
                        font-size 14px
                        font-weight bold
                        &:hover
                            text-decoration underline
</style>


