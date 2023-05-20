<template>
    <div class="m">
        <div v-if="isError" class="error">
            <text>{{ error }}</text>
        </div>
        <text class="mt10">Название:</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="title"
        ></MyInput>
        <text class="mt10">Категория:</text>
        <MySelect 
            v-model:value="selectedCategory"
            :options="categories"
        ></MySelect>
        <text class="mt10">Описание:</text>
        <MyTextarea 
            style="width: 400px;"
            v-model:value="desc"
            rows="4"
        ></MyTextarea>
        <text class="mt10">Характеристики:</text>
        <MyTextarea 
            style="width: 400px;"
            v-model:value="specifications"
            rows="8"
        ></MyTextarea>
        <text class="mt10">Цена (в рублях):</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="price"
        ></MyInput>
        <text class="mt10">Изображение (ссылка):</text>
        <MyInput 
            style="width: 400px;"
            v-model:value="img"
        ></MyInput>
        <MyButton
            class="mt10"
            @click="onItemEdit"
        >Изменить</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    props: {
        item: {
            type: Object,
            required: true
        },
        category: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            selectedCategory: '',
            title: '',
            desc: '',
            specifications: '',
            price: '',
            img: '',
            isError: false,
            error: '',
            categories: []
        }
    },
    async mounted() {
        this.title = this.item.title
        this.desc = this.item.desc
        this.specifications = this.item.specifications
        this.price = this.item.price
        this.img = this.item.img
        
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
            this.selectedCategory = this.category._id
            this.isError = false
        } catch (e) {
            console.log(e)
            this.categories = []
            this.error = e.response.data.error.message
            this.isError = true
        }
    },
    methods: {
        async onItemEdit() {
            const price = parseInt(this.price)
            //console.log(price)
            if (isNaN(price)) {
                this.isError = true;
                this.error = 'Неверный формат цены'
                return
            }

            try {
                const response = await axios.put(
                    'http://localhost:5000/admin/items/update', 
                    {
                        item: {
                            _id: this.item._id,
                            title: this.title,
                            desc: this.desc,
                            specifications: this.specifications,
                            price: price,
                            img: this.img,
                            category_id: this.selectedCategory
                        }
                    },
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        },
                    }
                )
                //console.log(response)

                this.isError = false
                this.$emit('onItemEdit', {})
            } catch (e) {
                console.log(e)

                this.isError = true;
                this.error = e.response.data.error.message
            } 
        }
    },
    computed: {
        ...mapState({
            isAuth: state => state.auth.isAuth,
            token: state => state.auth.token
        }),
    }
}
</script>

<style scoped>
.m {
    display: flex;
    flex-direction: column;
}
.mt10 {
    margin-top: 10px;
}
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
}
</style>