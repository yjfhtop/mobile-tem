<template>
    <div class="form-input">
        <div class="label">
            {{label}}
        </div>
        <div class="input-c">
            <input :type="type" v-model="useVal" :placeholder="placeholder"/>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'FormInput',
        props: {
            value: {
            },
            label: {
                type: String
            },
            type: {
                type: String,
                default: 'text'
            },
            placeholder: {
                type: String,
                default: ''
            }
        },
        data() {
            return {}
        },
        computed: {
            useVal: {
                get() {
                    return this.value
                },
                set(v) {
                    this.$emit('input', v)
                }
            }
        }
    }
</script>

<style scoped lang="less">
    .form-input {
        margin-top: 20px;
        &:first-child {
            margin-top: 0;
        }
        .label {
            font-size: @fontSizeLarge;
            font-weight: bold;
            color: @colorTextPrimary;
        }
        .input-c {
            margin-top: 10px;
            input {
                height: 28px;
                width: 100%;
                font-size: @fontSizeMedium;
                line-height: 27px;
                border-bottom: 1px solid @colorBorderLight;
                &::placeholder {
                    color: @colorTextPlaceHolder;
                }
            }
        }
    }
</style>
