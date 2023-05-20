<template>
    <CategoryItem class="category"
        v-for="category in categories"
        v-bind:category="category"
        v-bind:isSelected="category == selectedCategory"
        @onCategorySelect="onCategorySelect"
        :key="category._id"
    >
    </CategoryItem>
</template>

<script>
import CategoryItem from './CategoryItem.vue';

export default {
    props: {
        categories: {
            type: Array,
            required: true,
        },
        selectedCategory: {
            type: Object,
            required: true
        }
    },
    methods: {
        onCategorySelect(category) {
            //console.log('onCategorySelect from Categories')
            this.$emit("onCategorySelect", category);
        }
    },
    computed: {
        
    },
    components: { CategoryItem }
}
</script>

<style scoped> 
.category {
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    display: flex;
    margin-left: 20px;
}
</style>