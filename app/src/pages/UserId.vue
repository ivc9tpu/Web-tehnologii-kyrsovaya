<template>
    <div>
        <UserItem :item="user" :showDetailsButton="false"></UserItem>
        <div v-if="orders.length > 0">
            <OrderList  :orders="orders"></OrderList>
        </div>
        <div v-else
            style="display: flex; 
            flex-direction: column; 
            align-items: center;
            margin-top: 10px;">
            <text>У данного пользователя нет заказов</text>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import UserItem from '@/components/UserItem.vue';
import OrderList from '@/components/OrderList.vue';

export default {
    props: {},
    data() {
        return {
            user: {},
            orders: []
        };
    },
    async mounted() {
        await this.getUserOrders();
    },
    methods: {
        async getUserOrders() {
            try {
                const response = await axios.get("http://localhost:5000/admin/users/" + this.$route.params.id, {
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                });
                this.isError = false;
                this.error = "";
                this.user = response.data.user;
                this.orders = response.data.orders;
            }
            catch (e) {
                console.log(e);
                this.isError = true;
                this.error = e.response.data.error.message;
            }
        },
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    },
    components: { UserItem, OrderList }
}
</script>

<style scoped>
</style>