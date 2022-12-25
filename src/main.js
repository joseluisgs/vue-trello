import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'

// Firebase setup
import { firebaseApp } from '@/services/Firebase'
import { VueFire, VueFireAuth } from 'vuefire'

// Mis estilos
import '@/assets/styles/main.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// Firebase setup
app.use(VueFire, {
  // imported above but could also just be created here
  firebaseApp,
  modules: [
    // we will see other modules later on
    VueFireAuth(),
  ],
})

app.mount('#app')
