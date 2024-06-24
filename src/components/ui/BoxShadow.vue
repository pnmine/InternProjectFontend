<template>
  <div class="box-shadow">
    <slot></slot>
  </div>
</template>

<style scoped>
.box-shadow {
  background-color: var(--sky-025);
  box-shadow:
    10px 10px 10px var(--sky-050),
    -10px -10px 10px var(--grey-055);
}
</style>
