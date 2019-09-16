<template>
    <div class="product-page">
        <van-nav-bar title="消息详情" left-text="返回" left-arrow @click-left="onClickLeft"/>
        <van-swipe :autoplay="3000" indicator-color="white">
            <van-swipe-item v-for="(url,bannerIdx) in images" :key="bannerIdx"><img  v-lazy="url+'|375_300_png'" alt="product image"></van-swipe-item>
        </van-swipe>
    </div>
</template>
<script>
import { Swipe, SwipeItem, NavBar } from 'vant'
export default {
    name: 'Product',
    components: {
        [Swipe.name]: Swipe,
        [SwipeItem.name]: SwipeItem,
        [NavBar.name]: NavBar
    },
    data() {
        return {
            images: ['https://img.meian.co/productHTI.png', 'https://img.meian.co/producthpv.png'],
            productInfo: {}
        }
    },
    methods: {
        getPageConfig() {},
        getProductInfo() {},
        onClickLeft() {}
    }
}
</script>
<style lang="less" scoped>
.product-page {
}
</style>
