<template>
  <div class="navbar bg-base-100 flex-col md:flex-row">
    <div class="flex-1">
      <Icon
        icon="mdi:trello"
        class="mr-1 h-8 w-8 text-secondary-focus"
      />
      <h1 class="text-center font-sans text-3xl font-semibold tracking-wide text-primary">
        Vue Trello
      </h1>
    </div>
    <div class="flex-none gap-2 p-4 lg:py-0">
      <div class="form-control">
        <input
          type="search"
          placeholder="Search Card"
          class="input-bordered input"
          v-model="searchTerm"
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
            <a @click="changeBackground">
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
        class="cursor-text font-sans text-3xl font-semibold tracking-wide text-primary"
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

  const searchTerm = computed({
    get: () => boardStore.getSearchTerm,
    set: (value) => boardStore.setSearchTerm(value),
  })

  async function userLogout() {
    try {
      await userStore.userLogout()
      router.push({ name: 'Auth' })
    } catch (error) {
      console.error(error)
    }
  }

  async function createColumn() {
    try {
      const user = await userStore.getUser()
      await boardStore.createColumn(user)
    } catch (error) {
      console.error(error)
    }
  }

  async function onEdit(event) {
    try {
      const user = await userStore.getUser()
      if (event.target.innerText.trim() === '') return (event.target.innerText = boardName.value)
      await boardStore.updateBoardName(user.uid, event.target.innerText.trim())
    } catch (error) {
      console.error(error)
    }
  }

  // Esto es candidato a quitarlo, lo de cambiar el Fondo
  // Usamos watschEffect para que se ejecute cuando cambie el valor de la variable y se ejecuta la primera vez
  const element = document.body

  // Si no quieres que haga esto, quita el comentario de la línea
  // watchEffect(() => {
  //   element.style.backgroundColor = boardStore.getBoardBackgroundColor
  // })

  let color = ''
  function changeBackground() {
    element.onmousemove = function (event) {
      color = getBackgroundColor(event)
      element.style.backgroundColor = color
    }
    element.ondblclick = async function () {
      element.onmousemove = null
      try {
        const user = await userStore.getUser()
        await boardStore.updateBoardBackgroundColor(user.uid, color)
      } catch (error) {
        console.error(error)
      }
    }
  }

  function getBackgroundColor(event) {
    // Cogemos y hacemos un parseo de los valores de la posición del ratón de X e Y
    const hue = parseInt((360 / window.innerWidth) * event.clientX, 10)
    const saturation = parseInt((360 / window.innerHeight) * event.clientY, 10)
    return `hsla(${hue}, ${saturation}%, 50%, 1)`
  }
</script>

<style scoped></style>
