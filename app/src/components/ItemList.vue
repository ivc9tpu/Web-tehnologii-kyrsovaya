<template>
    <div class="items">
        <ItemItem 
            v-for="item in items"
            :item="item"
            :key="item._id"
            :hideAddBusket="hideAddBusket"
        ></ItemItem>
    </div>
</template>

<script>
import ItemItem from './ItemItem.vue';

export default {
    props: {
        items: {
            type: Array,
            required: true
        },
        hideAddBusket: {
            type: Boolean,
            default: false
        }
    },
    methods: {

    },
    components: { ItemItem, ItemItem }
}
</script>

<style scoped>
.items {
    margin-top: 15px;
}
</style>