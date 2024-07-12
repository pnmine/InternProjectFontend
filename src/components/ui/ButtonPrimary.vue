<template>
  <button class="button-primary">
    <slot></slot>
  </button>
</template>
<style scoped>
.button-primary {
  color: white;
  padding: 1rem 2rem;
  font-size: 1rem;
  cursor: pointer;
  text-align: center;
  background: var(--indigo-400);
  border: 0;
  outline: none;
  margin: auto;
  width: 100%;
  border-radius: 20px;
  box-shadow:
    var(--indigo-300) 0px 2px 10px 0px,
    var(--sky-050) 0px 7px 29px 0px;
  transition: all 0.3s ease-in-out;
}
.button-primary:hover {
  color: var(--indigo-400);
  background-color: var(--grey-050);
  box-shadow:
    var(--indigo-300) -2px 2px 10px 0px,
    var(--sky-050) 0px 7px 29px 0px;
}
</style>
