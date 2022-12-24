import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../views/AuthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Auth',
      component: AuthView,
    },
    // El resto de rutas las importamos cuando el usuario quiera acceder a ellas, con lazy loading
    {
      path: '/board',
      name: 'Board',
      component: () => import(/* webpackChunkName: "Board" */ '../views/BoardView.vue'),
      // Mi ruta hija
      children: [
        {
          path: 'card/:id',
          name: 'Card',
          component: () => import(/* webpackChunkName: "Card" */ '../views/CardView.vue'),
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*', // Cualquier ruta que no sea las anteriores
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFoundView.vue'),
    },
  ],
})

export default router
