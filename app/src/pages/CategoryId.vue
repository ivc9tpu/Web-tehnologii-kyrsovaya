<template>
    <div v-if="isError" class="error">
        <text>{{ error }}</text>
    </div>
    <div v-else>
        <div>
            <text><strong>Название:</strong> {{ category.name }} </text>
        </div>
        <div>
            <text>Товары в данной категории:</text>
        </div>
        <!--<MyButton @click="deleteCategory"> Удалить </MyButton>-->
        <ItemList :hideAddBusket="true" v-model:items="items"></ItemList>
    </div>
</template>

<script>
import ItemList from '@/components/ItemList.vue';
import axios from 'axios'
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {
            category: {},
            items: [],
            isError: false,
            error: ""
        };
    },
    props: {},
    methods: {
        async getCategoryItems() {
            try {
                const response = await axios.get("http://localhost:5000/categories/" + this.$route.params.id, 
                {
                    headers: {
                        Authorization: "Bearer " + this.token
                    },
                });
                this.isError = false;
                this.error = "";
                this.category = response.data.category;
                this.items = response.data.items;
            }
            catch (e) {
                console.log(e);
                this.isError = true;
                this.error = e.response.data.error.message;
            }
        },
        async deleteCategory() {
            try {
                const response = await axios.delete("http://localhost:5000/admin/categories/" + this.$route.params.id,
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
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    },
    async mounted() {
        await this.getCategoryItems();
    },
    components: { ItemList }
}
</script>

<style scoped>
* {
    margin: 0;
    padding: 15px;
    box-sizing: border-box;
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