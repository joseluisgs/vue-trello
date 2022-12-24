<template>
  <footer class="footer items-center bg-neutral p-3 text-neutral-content">
    <div class="grid-flow-col items-center">
      <Icon
        icon="mdi:trello"
        class="h-5 w-5"
      />
      <p>Copyright © 2022 - José Luis González Sánchez</p>
    </div>
    <div class="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
      <a href="https://twitter.com/joseluisgonsan" target="_blank"
        ><Icon
          icon="mdi:twitter"
          class="h-5 w-5"
        />
      </a>
      <a href="https://github.com/joseluisgs" target="_blank"
        ><Icon
          icon="mdi:github"
          class="h-5 w-5"
      /></a>
      <a href="https://www.linkedin.com/in/joseluisgonsan/" target="_blank"
        ><Icon
          icon="mdi:linkedin"
          class="h-5 w-5"
      /></a>
    </div>
  </footer>
</template>

<script setup>
  import { Icon } from '@iconify/vue'
</script>

<style scoped></style>
