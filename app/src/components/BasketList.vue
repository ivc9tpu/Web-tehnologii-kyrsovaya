<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-if="basket_items.length == 0">
        <text>Ваша корзина пока пуста</text>
    </div>
    <div v-else class="items">
        <strong>Итоговая цена: {{ total_cost }} руб.</strong>
        <BasketItem @onItemChange="calc_cost"
            v-for="item in basket_items"
            :item="item"
            :key="item._id"
            style="margin-top: 10px;"
        ></BasketItem>
        <MyButton
            @click="createOrder"
            style="align-self: center;"
        >Создать заказ</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import BasketItem from './BasketItem.vue';

export default {
    components: { BasketItem },
    emits:['onHide'],
    data() {
        return {
            total_cost: 0,
            error: '',
            isError: false
        }
    },
    methods: {
        ...mapMutations({
            basket_items_set: 'basket/basket_items_set'
        }),
        calc_cost() {
            let new_total_cost = 0
            this.basket_items.forEach(bi => {
                new_total_cost += bi.price * bi.count
            });

            this.total_cost = new_total_cost
        },
        async createOrder() {
            try {
                const new_basket_items = []
                for(let i = 0; i < this.basket_items.length; i++) {
                    new_basket_items.push(this.basket_items[i])
                }
                console.log(new_basket_items)
                const response = await axios.post(
                    'http://localhost:5000/createorder', 
                    {
                        items: new_basket_items
                    },
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        },
                    }
                )

                //console.log(response)
                this.basket_items_set([])
                this.$emit('onHide')
                this.$router.push('/ordersuccess')
            } catch (e) {
                console.log(e)
                this.error = e.response.data.error.message
                this.isError = true
            }
        }
    },
    computed: {
        ...mapState({
            basket_items: state => state.basket.basket_items,
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        })
    },
    mounted() {
        this.calc_cost()
    }
}
</script>

<style scoped>
.items {
    margin-top: 15px;
    display: flex;
    flex-direction: column;
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