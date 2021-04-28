<template>
    <div class="login-page">
        <div class="top-header">
            <div class="logo-c">
                <img class="logo-img" src="/logo.png" alt="">
                <div class="info-c">
                    <img src="/login/welcome-login.png" alt="">
                </div>
            </div>
        </div>

        <div class="form-c">
            <div class="form-main">
                <div>
                    <FormInput v-model="formData.userName" label="账号" placeholder="请输入您的账号"></FormInput>
                    <FormInput v-model="formData.userName" style="margin-top: 37px;" label="密码" type="password" placeholder="请输入您的密码"></FormInput>
                </div>
                <div style="margin-top: 40px;">
                    <FormButton size="big" @click.native="submitForm" :disabled="submitBtnDisabled">
                        登录
                    </FormButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import FormInput from '@/components/FormInput'
    import FormButton from '@/components/FormButton'
    export default {
        name: 'Login',
        components: {
            FormInput,
            FormButton
        },
        data: function() {
            return {
                formData: {
                    userName: '',
                    password: ''
                }
            }
        },
        computed: {
            submitBtnDisabled() {
                return this.formData.userName && this.formData.password
            }
        },
        methods: {
            submitForm() {
                console.log(1)
            }
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
                text-align: center;

                .logo-img {
                    width: 60px;
                }

                .info-c {
                    margin-top: 20px;

                    img {
                        width: 140px;
                    }
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

            .form-main {
                width: 302px;
                margin: 0 auto;
            }
        }
    }
</style>
