import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Commits from '../views/Commits.vue'
import AddRepo from '../views/AddRepo.vue'

Vue.use(VueRouter)

const routes = [
    {path: '/', name: 'Home', component: Home},
    {path: '/add-repo', name: 'AddRepo', component: AddRepo},
    {path: '/commits/:repo_id', name: 'Commits', component: Commits},
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
