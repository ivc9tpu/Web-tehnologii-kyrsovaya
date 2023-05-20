<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-else class="m">
        <div v-if="isError" class="error">
            <text>{{ error }}</text>
        </div>
        <text class="mt10"><strong>Название:</strong> {{ item.title }}</text>
        <text class="mt10"><strong>Категория:</strong> {{ category.name }}</text>
        <text class="mt10"><strong>Описание:</strong> {{ item.desc }}</text>
        <text class="mt10"><strong>Характеристики:</strong> {{ item.specifications }}</text>
        <text class="mt10"><strong>Цена (в рублях):</strong> {{ item.price }}</text>
        <text class="mt10"><strong>Изображение:</strong></text> 
        <div>
            <img :src="item.img" height="512" w>
        </div>
        <div v-if="isAdmin" style="display: flex; flex-direction: column;">
            <MyDialog v-model:show="showDialog">
                <ItemEdit @onItemEdit="onItemEdit" :item="item" :category="category"></ItemEdit>
            </MyDialog>
            <MyButton
                class="mt10"
                @click="onEdit"
            >Редактировать</MyButton>
            <MyButton
                class="mt10"
                @click="onDelete"
            >Удалить</MyButton>
        </div>
        <MyButton
            class="mt10"
            @click="toBasket"
        >В корзину</MyButton>
    </div>
</template>

<script>
import ItemEdit from '@/components/ItemEdit.vue';
import axios from 'axios';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            item: {},
            category: {},
            showDialog: false,
            isError: false,
            error:''
        };
    },
    methods: {
        ...mapMutations({
            basket_items_set: 'basket/basket_items_set'
        }),
        onEdit() {
            this.showDialog = !this.showDialog
        },
        onItemEdit() {
            this.$router.go()
        },
        async onDelete() {
            try {
                const response = await axios.delete("http://localhost:5000/admin/items/" + this.$route.params.id,
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    }
                });
                this.isError = false;
                this.error = "";
                this.$router.go()
            } catch(e) {
                console.log(e)
                this.isError = true;
                this.error = e.response.data.error.message;
            }
        },
        toBasket() {
            const new_basket_items = []
            let added = false
            for(let i = 0; i < this.basket_items.length; i++) {
                new_basket_items.push(this.basket_items[i])
                if (this.basket_items[i]._id == this.item._id) {
                    new_basket_items[i].count += 1
                    added = true
                }
            }
            if (!added) {
                new_basket_items.push({...this.item, count: 1})
            }

            this.basket_items_set(new_basket_items)
        }
    },
    async mounted() {
        try {
            const response = await axios.get("http://localhost:5000/items/" + this.$route.params.id, {
                headers: {
                    Authorization: "Bearer " + this.token
                },
            });
            //console.log(response.data);
            this.isError = false;
            this.error = "";
            this.item = response.data.item;
            this.category = response.data.category;
        }
        catch (e) {
            console.log(e);
            this.isError = true;
            this.error = e.response.data.error.message;
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token,
            basket_items: state => state.basket.basket_items
        }),
        ...mapGetters({
            isAdmin: "auth/isAdmin",
        }),
    },
    components: { ItemEdit }
}
</script>

<style scoped>
.m {
    display: flex;
    flex-direction: column;
    margin-left: 15px;
}
.mt10 {
    margin-top: 10px;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
    display: flex;
    flex-direction: row;
    justify-content: center;
}
</style>