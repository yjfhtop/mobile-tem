<template>
    <div class="item">
        <div class="item-container clearfix">
            <div class="user-icon fl">
                <img :src="messageData.user.icon" alt="">
            </div>
            <div class="user-info-and-message fl">
                <div class="name-and-time">
                    <span>{{messageData.user.nickName}}</span>
                    <span>{{messageData.sendTime}}</span>
                </div>
                <div class="message">
                    <div class="message-txt">
                        {{messageData.message}}
                    </div>
                    <div class="file-c">
                        <div class="file-item" v-for="item in messageData.files" :key="item.src">
                            <img v-if="httpFileIsImg(item.src)" :src="item.src" alt="" @click="lookImg(item.src)">
                            <a v-else :href="item.src" :download="item.src">点击下载附件</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { httpFileIsImg } from '@/utils'
import Vue from 'vue'
import { ImagePreview } from 'vant'

Vue.use(ImagePreview)
export default {
    name: 'ChatItem',
    data: function() {
        return {}
    },
    props: {
        messageData: {
            type: Object,
            required: true
            /* 格式: {
                id: 1,
                user: {
                    nickName: '杨', // 昵称
                    icon: 'https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png' // 头像
                },
                message: '你好，世界', // 文字信息
                files: [{ src: 'https://gw.alicdn.com/tps/TB1W_X6OXXXXXcZXVXXXXXXXXXX-400-400.png' }], // 文件信息
                isOwn: true,
                sendTime: '2018-10-01 15:30:52'
            }*/
        }
    },
    methods: {
        httpFileIsImg,
        lookImg(src) {
            ImagePreview([
                src
            ])
        }
    }
}
</script>

<style scoped lang="less">
    .item-container {
        .user-icon {
            width: 40px;
            height: 40px;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .user-info-and-message {
            margin-top: 10px;
            img {
                max-width: 50px;
            }
            .message {
                margin-top: 5px;
                border: 1px solid @colorBorderLight;
                border-radius: 5px;
                padding: 5px;
            }
        }
    }

</style>
