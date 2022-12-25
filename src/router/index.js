import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
// import BoardView from '@/views/BoardView.vue'
// import CardView from '@/views/CardView.vue'
// import NotFoundView from '@/views/NotFoundView.vue'

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
      //component: BoardView,
      // Mi ruta hija
      children: [
        {
          path: 'card/:id',
          name: 'Card',
          component: () => import(/* webpackChunkName: "Card" */ '../views/CardView.vue'),
          //component: CardView,
        },
      ],
    },
    {
      path: '/:pathMatch(.*)*', // Cualquier ruta que no sea las anteriores
      name: 'NotFound',
      component: () => import(/* webpackChunkName: "NotFound" */ '../views/NotFoundView.vue'),
      //component: NotFoundView,
    },
  ],
})

export default router
