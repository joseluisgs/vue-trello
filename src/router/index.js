import AuthView from '@/views/AuthView.vue'
import { createRouter, createWebHistory } from 'vue-router'
// import BoardView from '@/views/BoardView.vue'
// import CardView from '@/views/CardView.vue'
// import NotFoundView from '@/views/NotFoundView.vue'

// Importamos la store
import { useUserStore } from '@/stores/user'

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
      // Le decimos que requiere autenticacion en base a una meta propiedad
      meta: {
        requiresAuth: true,
      },
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

// Creamos un guard para proteger las rutas
router.beforeEach(async (to, from, next) => {
  // Obtenemos la store
  const userStore = useUserStore()
  const user = await userStore.getUser()
  const requiresAuth = to.matched.some((record) => record.meta.requiresAuth) // Si alguna de las rutas que estoy visitando tiene la meta propiedad requiresAuth

  // Si requiere autenticacion y no hay usuario, redirigimos a Auth
  if (requiresAuth && !user) {
    next({ name: 'Auth' })
  }

  // si va a Auth y hay usuario, redirigimos a Board
  else if (to.name === 'Auth' && user) {
    next({ name: 'Board' })

    // Si no hay ninguna de las anteriores, seguimos
  } else {
    next()
  }
})

export default router
