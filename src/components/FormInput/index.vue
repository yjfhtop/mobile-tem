<template>
    <div class="form-input">
        <div class="label">
            {{label}}
        </div>
        <div>

        </div>
    </div>
</template>

<script>
export default {
    name: 'FormInput',
    props: {
        label: {
            type: String
        }
    },
    data() {
        return {}
    }
}
</script>

<style scoped lang="less">
    .form-input {
        font-size: @fontSizeLarge;
        font-weight: bold;
        color: @colorTextPrimary;
    }
</style>
