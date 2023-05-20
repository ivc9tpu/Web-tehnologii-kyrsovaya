<template>
    <div class="item">
        <div>
            <img :src="item.img"
            height="128"/>
        </div>
        <div 
            style="margin-left: 15px;"
            class="item__desc"
        >
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Название: </strong>
                <text>{{ item.title }}</text>
            </div>
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Описание: </strong>
                <text>{{ item.desc }}</text>
            </div>
            <div class="item__desc__item">
                <strong style="margin-right: 10px;">Цена: </strong>
                <text>{{ item.price }} руб.</text>
            </div>
            <MyButton 
                @click="$router.push('/items/' + item._id)"
                style="width: fit-content;"
                >Подробнее</MyButton>
        </div>
        <div class="item__btns xd">
            <MyButton v-if="showAddMinus" @click="minus"> - </MyButton>
            <strong v-if="!showAddMinus">Кол-во:</strong> <MyButton> {{ item.count }} </MyButton>
            <MyButton v-if="showAddMinus" @click="add"> + </MyButton>
        </div>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';

export default {
    data() {
        return {  
        }
    },
    props: {
        item: {
            type: Object,
            requred: true
        },
        showAddMinus: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        ...mapMutations({
            basket_items_set: 'basket/basket_items_set'
        }),
        add() {
            const new_basket_items = []
            for(let i = 0; i < this.basket_items.length; i++) {
                new_basket_items.push(this.basket_items[i])
                if (this.basket_items[i]._id == this.item._id) {
                    new_basket_items[i].count += 1
                }
            }
            this.basket_items_set(new_basket_items)
            this.onItemChange()
        },
        minus() {
            const new_basket_items = []
            for(let i = 0; i < this.basket_items.length; i++) {
                new_basket_items.push(this.basket_items[i])
                if (this.basket_items[i]._id == this.item._id) {
                    new_basket_items[i].count -= 1
                    if(new_basket_items[i].count < 1) {
                        new_basket_items.pop()
                    }
                }
            }
            this.basket_items_set(new_basket_items)
            this.onItemChange()
        },
        onItemChange() {
            this.$emit('onItemChange')
        }
    },
    computed: {
        ...mapState({
            basket_items: state => state.basket.basket_items
        })
    }
}
</script>

<style scoped>
.item {
    padding: 15px;
    border: 2px solid teal;
    display: flex;
    align-items: normal;
    justify-content:left;
}
.item__desc {
    display:flex;
    flex-direction: column;
}
.item__desc__item {
    display: flex;
    flex-direction: row;
}
.item__btns {
    display: flex;
    margin-left: auto;
    align-items: center;
    white-space: nowrap;
}
</style>