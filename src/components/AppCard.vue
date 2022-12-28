<template>
  <div
    @click.self="closeCard"
    class="wrapper absolute top-0 left-0 z-10 flex h-full w-full cursor-pointer items-center justify-center bg-base-300 bg-opacity-90"
  >
    <div class="w-1/3 rounded bg-white p-3 shadow-md">
      <div class="flex items-center">
        <UserAvatar />
        <h1
          contenteditable
          class="ml-2 cursor-text text-center font-sans text-2xl font-semibold tracking-wide text-primary-focus"
          @blur="updateCard('name', $event)"
        >
          {{ card.name }}
        </h1>
        <div class="flex-grow text-sm text-red-500">
          <div
            class="flex items-center justify-end"
          >
            <Icon
              icon="material-symbols:delete"
              class="mr-1 text-right"
              @click="deleteCard"
            />
            <a @click="deleteCard" href="#">Delete Card</a>
          </div>
        </div>
      </div>
      <div class="my-3 flex items-center justify-between">
        <div>
          <label
            class="mr-3 text-sm text-indigo-600"
            for="done"
            >Mark as done</label
          >
          <input
            type="checkbox"
            id="done"
            :checked="card.done"
            class="checkbox-success checkbox checkbox-xs"
            @change="updateCard('done', $event)"
          />
        </div>
        <input
          class="rounded bg-indigo-400 p-1 text-sm text-primary-content"
          type="date"
          :value="cardDate"
          @change="updateCard('date', $event)"
        />
      </div>
      <p
        contenteditable
        class="cursor-text text-sm text-gray-600"
        @blur="updateCard('description', $event)"
      >
        {{ card.description }}
      </p>
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
  import { useBoardStore } from '@/stores/board'
  import { Icon } from '@iconify/vue'
  import { computed } from 'vue'
  import { useRouter } from 'vue-router'

  // Mis propiedades
  const props = defineProps({
    card: {
      type: Object,
    },
  })

  const router = useRouter()
  const boardStore = useBoardStore()

  const cardDate = computed(() => new Date(+props.card.date).toLocaleDateString('en-CA'))

async function updateCard(key, evt) {
    // vamos a filtar los eventos que no queremos que se actualicen
  if (key === 'name' || key === 'description') {
      if (evt.target.innerText.trim() === '') {
        return (event.target.innerText = props.card[key])
      }
    }
      
    try {
      await boardStore.updateCardInfo({
        id: props.card.id,
        key,
        value: getValue(key, evt),
      })
    } catch (error) {
      console.log(error)
    }
  }

  function getValue(key, evt) {
    if (key === 'name' || key === 'description') {
      return evt.target.innerText.trim()
    } else if (key === 'date') {
      return new Date(evt.target.value).getTime()
    } else if (key === 'done') {
      return evt.target.checked
    }
  }

  async function deleteCard() {
    try {
      await boardStore.deleteCard(props.card.id)
      closeCard()
    } catch (error) {
      console.log(error)
    }
  }
  function closeCard() {
    // historial -1
    router.push({ name: 'Board' })
  }
</script>

<style scoped></style>
