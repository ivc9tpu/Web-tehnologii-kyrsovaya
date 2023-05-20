<template>
    <div v-if="isAuthError" class="error">
        <text> {{ error }} </text>
    </div>
    <div v-else style="min-height: 100%;">
        <MyDialog v-model:show="dialogShow">
            <text>Название категории</text>
            <MyInput v-model:value="dialogValue"></MyInput>
            <MyButton @click="addCategory"> Добавить </MyButton>
        </MyDialog>
        <MyButton @click="showAddCategoryDialog">Добавить категорию</MyButton>
        <div style="display: flex;">
            <text>Поиск:</text>
            <MyInput v-model:value="searchQuery"></MyInput>
        </div>
        <div v-for="category in searchedCategories" >
            <CategoryItem 
                v-bind:category="category"
                @click="$router.push('/categories/'+category._id)"
            ></CategoryItem>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import CategoryItem from '@/components/CategoryItem.vue';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

 
export default {
    components: { CategoryItem },
    data() {
        return {
            searchQuery: "",
            categories: [],
            isAuthError: true,
            error: '',
            dialogShow: false,
            dialogValue: ''
        };
    },
    computed: {
        searchedCategories() {
            return this.categories.filter(c => c.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
        },
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    },
    methods: {
        showAddCategoryDialog() {
            this.dialogShow = true
        },
        async addCategory() {
            try {
                const response = await axios.post(
                    'http://localhost:5000/admin/categories/create', 
                    {
                        category: {
                            name: this.dialogValue
                        }
                    },
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        },
                    }
                )

                console.log(response)
                this.$router.go()
            } catch (e) {
                console.log(e)
                this.error = e.response.data.error.message
                this.isAuthError = true
            }
        }
    },
    async mounted() {
        try {
            const response = await axios.get(
                'http://localhost:5000/categories', 
                {
                    headers: {
                        Authorization : 'Bearer ' + this.token
                    }
                }
            )
            //console.log(response)
            this.categories = response.data.categories
            this.isAuthError = false
        } catch (e) {
            console.log(e)
            this.categories = []
            this.error = e.response.data.error.message
            this.isAuthError = true
        }
    }
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