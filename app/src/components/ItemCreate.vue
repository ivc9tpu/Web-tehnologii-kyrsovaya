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
            @click="onItemCreate"
        >Создать</MyButton>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';

export default {
    props: {
        categories: {
            type: Array,
            required: true,
            default: []
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
            error: ''
        }
    },
    methods: {
        async onItemCreate() {
            const price = parseInt(this.price)
            //console.log(price)
            if (isNaN(price)) {
                this.isError = true;
                this.error = 'Неверный формат цены'
                return
            }

            try {
                const response = await axios.post(
                    'http://localhost:5000/admin/items/create', 
                    {
                        item: {
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
                console.log(this.selectedCategory)

                console.log(response)
            } catch (e) {
                console.log(e)

                this.isError = true;
                this.error = e.response.data.error.message
            }
            
            this.isError = false
            this.$emit('onItemCreate', {})
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