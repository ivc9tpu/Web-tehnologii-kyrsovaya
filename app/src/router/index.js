import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/pages/Main'
import Catalog from '@/pages/Catalog'
import Login from '@/pages/Login'
import Registration from '@/pages/Registration'
import RegSuccess from '@/pages/RegSuccess'
import Users from '@/pages/Users'
import UserId from '@/pages/UserId'
import Categories from '@/pages/Categories'
import CategoryId from '@/pages/CategoryId'
import ItemId from '@/pages/ItemId'
import OrderSuccess from '@/pages/OrderSuccess'
import MyOrders from '@/pages/MyOrders'

const routes = [
  {
    path:'/',
    component: Main
  },
  {
    path:'/catalog',
    component: Catalog
  },
  {
    path:'/login',
    component: Login
  },
  {
    path:'/registration',
    component: Registration
  },
  {
    path:'/registration/success',
    component: RegSuccess
  },
  {
    path:'/users',
    component: Users
  },
  {
    path:'/users/:id',
    component: UserId
  },
  {
    path:'/categories',
    component: Categories
  },
  {
    path:'/categories/:id',
    component: CategoryId
  },
  {
    path:'/items/:id',
    component: ItemId
  },
  {
    path:'/ordersuccess',
    component: OrderSuccess
  },
  {
    path:'/myorders',
    component: MyOrders
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
