<template>
    <div class="login-page">
        <div class="top-header">
            <div class="logo-c">
                <img class="logo-img" src="/logo.png" alt="">
                <div class="info-c">

                </div>
            </div>
        </div>

        <div class="form-c">
            <Button size="large">11</Button>
        </div>
    </div>
</template>

<script>
import { Button } from 'vant'
export default {
    name: 'Login',
    components: {
        Button
    },
    data: function() {
        return {}
    },
    mounted() {
    }
}
</script>

<style scoped lang="less">
    .login-page {
        /*background-color: #ccc;*/
        min-height: 100vh;
        .top-header {
            position: relative;

            width: 100%;
            /*height: 4.8rem;*/
            height: 240px;
            background-color: @colorMain;

            .logo-c {
                position: absolute;
                z-index: 20;
                top: 65px;
                left: 50%;
                transform: translateX(-50%);
                .logo-img {
                    width: 60px;
                }
                .info-c {
                    margin-top: 20px;
                }
            }
        }

        .form-c {
            position: relative;
            z-index: 10;
            margin-top: -30px;
            padding-top: 39px;
            padding-bottom: 59px;

            background: #FFFFFF;
            border-radius: 30px 30px 0 0;
        }
    }
</style>
