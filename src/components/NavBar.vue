<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <Icon
        icon="mdi:trello"
        class="mr-1 h-8 w-8 text-secondary-focus"
      />
      <h1 class="text-center font-sans text-3xl font-semibold tracking-wide text-primary">
        Vue Trello
      </h1>
    </div>
    <div class="flex-none gap-2">
      <div class="form-control">
        <input
          type="text"
          placeholder="Search Card"
          class="input-bordered input"
        />
      </div>
      <div class="dropdown-end dropdown">
        <label
          tabindex="0"
          class="btn-ghost btn-circle avatar btn"
        >
          <UserAvatar />
        </label>
        <ul
          tabindex="0"
          class="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a> {{ userStore.userDisplayName }}</a>
          </li>
          <li>
            <a @click="userLogout"
              ><Icon
                icon="material-symbols:logout"
                class="h-5 w-5 text-primary"
              />
              Logout</a
            >
          </li>
          <li>
            <a>
              <Icon
                icon="fluent:color-background-20-filled"
                class="h-5 w-5 text-primary"
              />
              Background
            </a>
          </li>
          <li>
            <a>
              <Icon
                icon="mdi:theme-light-dark"
                class="h-5 w-5 text-primary"
              />
              Tema
              <div class="form-control">
                <input
                  data-toggle-theme="light,night"
                  data-act-class="night"
                  type="checkbox"
                  class="toggle-primary toggle"
                  checked
                />
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="flex justify-center">
    <div class="flex flex-col text-center">
      <h1
        class="font-sans text-3xl font-semibold tracking-wide text-primary"
        contenteditable
        @blur="onEdit"
      >
        {{ boardName }}
      </h1>
      <div class="flex flex-row items-center justify-center">
        <Icon
          icon="uil:create-dashboard"
          class="mr-2 text-secondary"
        />
        <a
          @click="createColumn"
          href="#"
          class="text-sm text-secondary"
        >
          Create column</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { useBoardStore } from '@/stores/board'
  import { useUserStore } from '@/stores/user'
  import { Icon } from '@iconify/vue'
  import { themeChange } from 'theme-change'
  import { computed, onMounted } from 'vue'
  import { useRouter } from 'vue-router'

  // La store
  const boardStore = useBoardStore()
  const userStore = useUserStore()

  // router
  const router = useRouter()

  // Cuando se monta el componente, se cambia el tema
  onMounted(() => {
    themeChange(false)
  })

  // computed de avatar, podría usar la store directamente
  const boardName = computed(() => boardStore.boardName)

  async function userLogout() {
    try {
      await userStore.userLogout()
      router.push({ name: 'Auth' })
    } catch (error) {
      console.log(error)
    }
  }

  async function createColumn() {
    try {
      const user = await userStore.getUser()
      await boardStore.createColumn(user)
    } catch (error) {
      console.log(error)
    }
  }

  async function onEdit(event) {
    try {
      const user = await userStore.getUser()
      if(event.target.innerText.trim() === '') return event.target.innerText = boardName.value
      await boardStore.updateBoardName(user.uid, event.target.innerText.trim())
    } catch (error) {
      console.log(error)
    }
  }
</script>

<style scoped></style>
