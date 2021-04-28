<template>
    <button class="form-button" :disabled="disabled" :class="{'big-btn': size==='big'}">
        <slot>
        </slot>
    </button>
</template>

<script>
    export default {
        name: 'FormButton',
        props: {
            txt: {
                type: String
            },
            // normal 还未实现
            // big
            size: {
                type: String,
                default: 'normal'
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {}
        }
    }
</script>

<style scoped lang="less">
    .form-button {
        &.big-btn {
            width: 303px;
            height: 55px;
            background: @colorMain;
            border-radius: 28px;

            line-height: 28px;
            text-align: center;
            font-size: @fontSizeLarge;
            font-weight: 500;
            color: #FFFFFF;
        }
        &.disabled-btn{
        }

        &:disabled {
            background: @colorDisabled;
        }
    }
</style>
