<template>
  <div class="input-box">
    <box-icon :type="type" :name="icon"></box-icon>
    <input
      :type="inputType"
      :value="modelValue"
      :required="required"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <!-- ปกติ v-model จะจัดการ event update:modelValue ภายในDOM ให้เอง -->
    <!-- แต่จะใช้ $emit('update:modelValue', newValue) เพื่อส่งค่าใหม่กลับไปยัง parent component  -->
    <label>{{ label }}</label>
  </div>
</template>

<script>
export default {
  name: 'InputBox',
  props: {
    type: {
      type: String,
      default: 'solid'
    },
    icon: {
      type: String,
      required: false
    },
    inputType: {
      type: String,
      default: 'text'
    },
    label: {
      type: String,
      required: false
    },
    modelValue: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.input-box {
  height: 50px;
  margin: 2rem auto;
  position: relative;
}
.input-box input {
  text-align: left;
  width: 100%;
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
.input-box input:focus {
  border: 1px solid var(--indigo-400);
}
.input-box label {
  left: 4.5%;
  top: 25%;
  margin-left: 2rem;
  position: absolute;
  pointer-events: none;
  transition: transform 1s ease-in-out;
}
.input-box input:focus ~ label,
.input-box input:valid ~ label {
  top: -1.5rem;
}
.input-box input:invalid ~ label {
}

.input-box box-icon {
  box-sizing: content-box;
  position: absolute;
  margin-left: 1rem;
  /* margin-top: 13px;  50% of the height but 24x24 = 50-24 = 26  ,26/2 =13 */
  transform: translateY(
    50%
  ); /* use percentage values: the percentage is relative to the element itself, and not the parent. */
}
</style>
