import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AllResults from '../views/AllResults.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import NutrientsSearch from '../views/NutrientsSearch.vue';
import GrocerySearch from '../views/GrocerySearch.vue';
import MealPlanner from '../views/MealPlanner.vue';
import RecipeOfTheDayAndTips from '../views/RecipeOfTheDayAndTips.vue'; // Import the new view

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
  },
  {
    path: '/nutrients',
    name: 'NutrientsSearch',
    component: NutrientsSearch
  },
  {
    path: '/grocery',
    name: 'GrocerySearch',
    component: GrocerySearch
  },
  {
    path: '/meal-planner',
    name: 'MealPlanner',
    component: MealPlanner
  },
  {
    path: '/recipe-of-the-day-and-tips',
    name: 'RecipeOfTheDayAndTips',
    component: RecipeOfTheDayAndTips // Add the new route
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
