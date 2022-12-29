<template>
  <div class="flex justify-center">
    <Icon
      icon="mdi:trello"
      class="mr-1 h-8 w-8 text-secondary-focus"
    />
    <h1 class="text-center font-sans text-3xl font-semibold tracking-wide text-primary">
      Vue Trello
    </h1>
  </div>
  <div v-if="!userStore.user">
    <div class="container">
      <a
        @click="userLogin"
        class="flex h-screen w-full cursor-pointer items-center justify-center font-semibold text-primary underline hover:text-primary-focus text-lg"
        href="#"
        ><Icon icon="material-symbols:login" /> Login please</a
      >
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'
  import { Icon } from '@iconify/vue'
  import { themeChange } from 'theme-change'
  import { onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const router = useRouter()

  // Cuando se monta el componente, se cambia el tema
  onMounted(() => {
    themeChange(false)
  })

  async function userLogin() {
    try {
      await userStore.userLogin()
      router.push({ name: 'Board' })
    } catch (error) {
      console.error(error)
    }
  }
</script>

<style scoped></style>
