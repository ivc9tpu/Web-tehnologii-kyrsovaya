<template>
    <div class="main">
        <h2 style="align-self: center;">Заказ создан успешно!</h2>
        <MyButton @click="$router.push('/myorders')">
            Посмотреть список моих заказов
        </MyButton>
    </div>
</template>

<script>
export default {
}
</script>

<style scoped>
.main {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-left: 30%;
    margin-right: 30%;
}
</style>