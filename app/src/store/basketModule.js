export const basketModule = {
    state: () => ({
        basket_items: []
    }),
    getters: {
        
    },
    mutations: {
        basket_items_set(state, basket_items) {
            if(basket_items) {
                state.basket_items = basket_items
                
                localStorage.setItem('basket_items',JSON.stringify(basket_items))
            }
        }
    },
    actions: {
        
    },
    namespaced: true
}