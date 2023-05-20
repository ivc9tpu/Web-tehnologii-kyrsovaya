<template>
    <input :type="type" :value="value" @input="updateInput" class="input" type="text" style="margin-top: 15px;">
</template>

<script>
export default {
    name: "MyInput",
    props:{
        value: {
            type: [String, Number]
        },
        type: {
           type: String,
           default: 'text'
        }
    },
    methods: {
        updateInput(e) {
            this.$emit('update:value', e.target.value)
        }
    }
}
</script>

<style scoped>
.input {
    width: 100%;
    border: 1px solid teal;
    padding: 10px 15px;
}
</style>