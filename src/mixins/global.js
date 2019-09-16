// 本js文件是全局混入
export const MixinVuex = {
    // 混入常用 vuex
    computed: {
        routeParameter() {
            return this.$store.getters.routeParameter
        }
    }
}
