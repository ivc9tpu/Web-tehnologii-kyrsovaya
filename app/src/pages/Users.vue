<template>
    <div v-if="isAuthError" class="error">
        <text> {{ error }} </text>
    </div>
    <div v-for="user in users">
        <UserItem :item="user"></UserItem>
    </div>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from 'vuex';
import axios from 'axios';
import UserItem from '@/components/UserItem.vue';

export default {
    components: {
        UserItem
    },
    data() {
        return {
            users: [],
            isAuthError: false,
            error: ''
        }
    },
    
    async mounted() {
        this.getUsers()
    },

    methods: {
        async getUsers() {
            try {
                const response = await axios.get(
                    'http://localhost:5000/admin/users', 
                    {
                        headers: {
                            Authorization : 'Bearer ' + this.token
                        }
                    }
                )
                this.isAuthError = false
                this.users = response.data.users
            } catch (e) {
                console.log(e)
                this.users = []
                this.isAuthError = true
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
.error {
    margin-top: 25px;
    align-self: center;
    color: lightcoral;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>