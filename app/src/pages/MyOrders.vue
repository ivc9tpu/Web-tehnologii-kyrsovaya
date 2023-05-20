<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-else>
        <div v-if="orders.length > 0">
            <div class="centrize">
                <h2>Ваши заказы:</h2>
            </div>
            <div>
                <OrderList :orders="orders"></OrderList>
            </div>
        </div>
        <div v-else class="centrize">
            <text>Тут пока пусто</text>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import OrderList from '@/components/OrderList.vue';

export default {
    data() {
        return {
            orders: [],
            isError: false,
            error: ''
        };
    },
    components: { OrderList },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    },
    async mounted() {
        try {
            const response = await axios.get(
                'http://localhost:5000/myorders', 
                {
                    headers: {
                        Authorization : 'Bearer ' + this.token
                    },
                }
            )
            console.log(response.data.orders)

            this.orders = response.data.orders
            this.isError = false
        } catch (e) {
            console.log(e)
            this.error = e.response.data.error.message
            this.isError = true
        }
    }
}
</script>

<style scoped>
.centrize {
    display: flex; 
    flex-direction: column; 
    align-items: center; 
    margin-top: 15px;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>