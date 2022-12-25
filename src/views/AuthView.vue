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
        class="flex h-screen w-full items-center justify-center text-primary underline hover:text-primary-focus cursor-pointer font-semibold"
        href="#"
        ><Icon icon="material-symbols:login" /> Login please</a
      >
    </div>
  </div>
</template>

<script setup>
  import { useUserStore } from '@/stores/user'
  import { Icon } from '@iconify/vue'
  import { useRouter } from 'vue-router'

  const userStore = useUserStore()
  const router = useRouter()

  async function userLogin() {
    try {
      await userStore.userLogin()
      router.push({ name: 'Board' })
    } catch (error) {
      console.log(error)
    }
  }
</script>

<style scoped></style>
