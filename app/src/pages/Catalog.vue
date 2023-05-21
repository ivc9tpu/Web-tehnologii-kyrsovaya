<template>
    <div style="display:flex;  min-height: 100%;">
        <div style="width: 25%; background-color: lightgray; min-height: 100%;" >
            <MyInput 
                v-model:value="categorySearchQuery"
                placeholder="Поиск..."
                style="margin-left: 2.5%; width: 95%;"
            ></MyInput>
            <CategoryList 
                v-model:selectedCategory="selectedCategory"
                v-model:categories="searchedCategories"
                @onCategorySelect="onCategorySelect"
                style="min-height: 100%;"
            ></CategoryList>
        </div>
        <div style="width:75%; margin-left: 15px; margin-top: 15px; margin-right: 15px;">
            <div v-if="isAdmin">
                <MyDialog 
                    v-model:show="dialogShow"
                >
                    <ItemCreate
                        :categories="categories"
                        @onItemCreate="onItemCreate"
                    ></ItemCreate>
                </MyDialog>
                <MyButton
                    @click="showAddItemDialog"
                >Создать товар</MyButton>
            </div>
            <MyInput 
                v-model:value="itemSearchQuery"
                placeholder="Поиск..."
            ></MyInput>
            <ItemList
                v-model:items="searchedItems"
            ></ItemList>
        </div>
    </div>
</template>

<script>
import CategoryList from '@/components/CategoryList.vue';
import ItemList from '@/components/ItemList.vue';
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import ItemCreate from '@/components/ItemCreate.vue';

export default {
    components: {
    CategoryList: CategoryList,
    ItemList: ItemList,
    ItemCreate: ItemCreate
},
    data() {
        return {
            categories: [],
            selectedCategory: null,
            items: [],
            page: 1,
            limit: 10,
            pagesTotal: 1,
            isError: false,
            error: '',
            categorySearchQuery: '',
            itemSearchQuery: '',
            dialogShow: false,
            dialogValue: ''
        }
    },
    async mounted() {
        await this.loadCategories()
        await this.loadItems()
    },
    methods: {
        ...mapMutations({
            basket_items_set: 'basket/basket_items_set'
        }),
        async onCategorySelect(category) {
            //console.log('onCategorySelect from Catalog')
            if (this.selectedCategory == category) {
                this.selectedCategory = null
            } else {
                this.selectedCategory = category
            }
            await this.loadItems()
        },
        showAddItemDialog() {
            this.dialogShow = true
        },
        async onItemCreate() {
            this.dialogShow = false
            this.$router.go()
        },
        async loadCategories() {
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
                this.isError = true
                this.error = e.response.data.error.message
            }
        },
        async loadItems() {
            if(!this.selectedCategory) {
                try {
                    const response = await axios.get(
                    'http://localhost:5000/items', 
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        }
                    }
                )
                //console.log(response)

                this.items = response.data.items
                this.isAuthError = false 
                } catch (e) {
                    console.log(e)
                    this.isError = true
                    this.error = e.response.data.error.message
                }
            } else {
                try {
                    const response = await axios.get("http://localhost:5000/categories/" + this.selectedCategory._id, 
                    {
                        headers: {
                            Authorization: "Bearer " + this.token
                        },
                    });
                    //console.log(response)

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
            }
        }
    },
    computed: {
        ...mapState({
            basket_items: state => state.basket.basket_items
        }),
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),
        searchedCategories() {
            return this.categories.filter((c) => {
                let tmp = c.name
                return tmp.toLowerCase().includes(this.categorySearchQuery.toLowerCase())
            })
        },
        searchedItems() {
            return this.items.filter((c) => {
                let tmp = c.title
                return tmp.toLowerCase().includes(this.itemSearchQuery.toLowerCase())
            })
        }
    }
}
</script>

<style scoped>
</style>
