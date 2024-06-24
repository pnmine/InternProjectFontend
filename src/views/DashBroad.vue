<template>
  <navigation-bar></navigation-bar>
  <div class="dash-broad__container">
    <div class="dash-broad__content">
      <h3 class="dash-broad__title">DashBroad</h3>
    </div>
  </div>
</template>

<script>
import NavigationBar from '../components/ui/NavigationBar.vue'

export default {
  name: 'DashBroadView',
  components: {
    NavigationBar
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {}
}
</script>

<style scoped>
.dash-broad__container {
  top: 0;
  right: 0;
  height: 100vh;
  background: var(--grey-050);
}

.dash-broad__content {
  margin: 0 1rem;
  padding-top: 4.5rem;
}

.dash-broad__title {
  font-size: 2rem;
  font-weight: 500;
}
</style>