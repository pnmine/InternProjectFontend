<template>
  <div>
    <slot></slot>
  </div>
</template>
<style scoped>
div {
  height: 50px;
  margin: 1.5rem auto;
  position: relative;
}

div input {
  text-align: left;
  width: 75%;
  height: 100%;
  border: none;
  outline: none;
  border: 1px solid var(--grey-050);
  border-radius: 2rem;
  padding-left: 3rem;
  background: transparent;
  box-shadow:
    inset 2px 2px 4px #d1d9e6,
    inset -2px -2px 4px #f9f9f9;
}
div input:focus {
  border: 1px solid var(--indigo-400);
}
div label {
  left: 15.1%;
  top: 25%;
  margin-left: 2rem;
  position: absolute;
  pointer-events: none;
  transition: transform 1s ease-in-out;
}
div input:focus ~ label,
div input:valid ~ label {
  top: -1.5rem;
}
div input:invalid ~ label {
}

div box-icon {
  box-sizing: content-box;
  position: absolute;
  margin-left: 1rem;
  /* margin-top: 13px;  50% of the height but 24x24 = 50-24 = 26  ,26/2 =13 */
  transform: translateY(
    50%
  ); /* use percentage values: the percentage is relative to the element itself, and not the parent. */
}

</style>