<template>
  <Navbar @onBasketClick="onBasketClick"></Navbar>
  <div class="app">
      <router-view style="min-height: 100%;"></router-view>
  </div>  
  <MyDialog v-model:show="dialogVisible"
    :content_width="60">
    <BasketList @onHide="hideDialog"></BasketList>
  </MyDialog>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import BasketList from './components/BasketList.vue';

export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
        ...mapMutations({
            Auth: "auth/Auth",
            basket_items_set: "basket/basket_items_set"
        }),
        onBasketClick() {
          this.dialogVisible = true
        },
        hideDialog() {
          this.dialogVisible = false
        }
    },
    mounted() {
        const auth_params = localStorage.getItem("auth_params");
        this.Auth(JSON.parse(auth_params));
        const basket_items = localStorage.getItem("basket_items");
        this.basket_items_set(JSON.parse(basket_items));
    },
    components: { BasketList }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.app{
  padding: 0px;
  min-height: 100%;
}
</style>