<template>
  <div class="navbar bg-base-100">
    <div class="flex-1">
      <Icon
        icon="mdi:trello"
        class="h-8 w-8 text-secondary-focus mr-1"
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
            <a
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
              /> Tema
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
    <div class="text-center">
      <h1 class="font-sans text-3xl font-semibold tracking-wide text-primary">
        {{ boardName }}
      </h1>
      <a
        href="#"
        class="ml-2 mt-3 text-sm text-secondary"
        >Create column</a
      >
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { useBoardStore } from '@/stores/board'
  import { Icon } from '@iconify/vue'
  import { themeChange } from 'theme-change'
  import { computed, onMounted } from 'vue'

  // La store
  const boardStore = useBoardStore()

  // Cuando se monta el componente, se cambia el tema
  onMounted(() => {
    themeChange(false)
  })

  // computed de avatar, podría usar la store directamente
  const boardName = computed(() => boardStore.boardName)
</script>

<style scoped></style>
