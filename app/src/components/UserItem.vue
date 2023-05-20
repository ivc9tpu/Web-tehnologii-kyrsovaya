<template>
    <div class="item">
        <div>
            <div><strong>Логин: </strong>{{ item.username }}</div>
            <div><strong>Роли: </strong>
                <div v-for="role in item.roles">{{ role }}</div>
            </div>
        </div>
        <div v-if="showDetailsButton" class="item__btns">
            <MyButton @click="$router.push('/users/' + item._id)">Подробнее</MyButton>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        item: { type: Object },
        showDetailsButton: {type: Boolean, default: true}
    },
}
</script>

<style scoped>
.item {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: normal;
    justify-content:left;
}
.item__btns {
    display: flex;
    margin-left: auto;
    align-items: center;
}
</style>