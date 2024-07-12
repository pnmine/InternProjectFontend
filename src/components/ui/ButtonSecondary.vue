<template>
  <button class="button-secondary">
    <slot></slot>
  </button>
</template>
<style scoped>
.button-secondary {
  color: var(--indigo-400);
  margin: 1rem auto;
  width: 100%;
  height: 50px;
  border: none;
  outline: none;
  border-radius: 20px;
  background-clip: padding-box;
  background: var(--grey-050);
  box-shadow:
    inset 2px 2px 4px var(--sky-050),
    inset -2px -2px 4px var(--grey-055),
    var(--sky-050) 0px 7px 29px 0px;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.1s ease-in;
}
.button-secondary:hover {
  color: black;
  background-color: var(--sky-050);
}
</style>
