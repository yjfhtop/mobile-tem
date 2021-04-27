<template>
    <div class="xxx">
        <svg-icon icon-class="loading"></svg-icon>
    </div>
</template>

<script>
import { Dialog, Toast, Loading } from 'vant'
export default {
    name: 'Login',
    data: function() {
        return {}
    },
    mounted() {
        Toast.loading({
            message: '请求中...',
            forbidClick: true,
            duration: 0
        })

        Toast({
            message: '-------------',
            type: 'fail',
            duration: 5 * 1000
        })
        Toast.clear()
    }
}
</script>

<style scoped lang="less">
</style>
