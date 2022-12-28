<template>
  <div
    class="mb-3 cursor-move rounded border border-white bg-white px-3 pt-3 pb-5 shadow"
    @click="openCard"
    :class="{ done: card.done, overdue }"
  >
    <h4 class="text-md font-sans font-semibold tracking-wide text-gray-700">
      {{ card.name }}
    </h4>
    <div class="mt-4 flex items-center justify-between">
      <div class="flex flex-row items-center justify-center text-indigo-500">
        <Icon
          icon="material-symbols:calendar-month"
          class="mr-1"
        />
        <p class="text-xs">{{ cardDate }}</p>
      </div>

      <UserAvatar />
    </div>
  </div>
</template>

<script setup>
  import UserAvatar from '@/components/UserAvatar.vue'
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

  const cardDate = computed(() => new Date(+props.card.date).toLocaleDateString('es-ES'))

  const overdue = computed(() => {
    if (props.card.done) return false
    return props.card.date < Date.now()
  })

  function openCard() {
    router.push({ name: 'Card', params: { id: props.card.id } })
  }
</script>

<style scoped>
  .done {
    @apply bg-green-200;
  }
  .overdue {
    @apply bg-red-200;
  }
</style>
