import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue';
import AllResults from '../views/AllResults.vue';
import RecipeDetails from '../views/RecipeDetails.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/results',
    name: 'AllResults',
    component: AllResults
  },
  {
    path: '/recipe/:id',
    name: 'RecipeDetails',
    component: RecipeDetails
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
