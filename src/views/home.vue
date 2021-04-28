<template>
    <div class="home">
        本页面正在开发中
    </div>
</template>

<script>
// home 页暂时不需要开发， 这里是home页不是诊所的主页
    export default {
        name: 'Home',
        data() {
            return {}
        },
        methods: {
            gotoLogin() {
                this.$router.push({ name: 'Test' })
            }
        }
    }
</script>
