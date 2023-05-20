<template>
    <div class="main">
        <h1>Главная страница приложения</h1>
        <MyButton class="mt15" v-if="isAdmin" @click="$router.push('/users')">Пользователи</MyButton>
        <MyButton class="mt15" v-if="isAdmin" @click="$router.push('/categories')">Категории</MyButton>
        <MyButton class="mt15" @click="$router.push('/catalog')">Каталог</MyButton>
        <MyButton class="mt15" @click="$router.push('/myorders')">Мои заказы</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    computed: {
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),
    }
}
</script>

<style scoped>
.main {
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}

.mt15 {
    margin-top: 15px;
}
</style>