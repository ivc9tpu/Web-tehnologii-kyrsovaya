<template>
    <div
        @click="onCategorySelect"
        class="non-selected"
        :class="{selected: isSelected}"
        style="cursor: pointer;"
    >
    <strong v-if="isSelected">
        {{category.name}}
    </strong>
    <div v-else>
        {{category.name}}
    </div>
    </div>
</template>

<script>
export default {
    props: {
        category: {
            type: Object,
            required: true
        },
        isSelected: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        onCategorySelect() {
            //console.log('onCategorySelect from CategoryItem')
            this.$emit('onCategorySelect', this.category)
        }
    }
}
</script>

<style scoped>
.non-selected {
    padding: 2px;
}
.selected {
    padding: 2px;
    border: 1px solid rgb(	50, 205, 50);
    border-radius: 5px;
    display: flex;
}
</style>