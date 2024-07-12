<template>
  <nav class="navigation-bar">
    <router-link to="/" class="navigation-bar__dashboard">
      <box-icon
        class="navigation-bar__dashboard--icon"
        type="solid"
        size="sm"
        name="dashboard"
      ></box-icon>
      <h1 class="navigation-bar__dashboard--title">Dashboard</h1>
    </router-link>
    <div class="navigation-bar__logout">
      <button-secondary @click="logout">Logout</button-secondary>
    </div>
  </nav>
</template>

<script>
import ButtonSecondary from './ButtonSecondary.vue'
export default {
  name: 'NavigationBar',
  components: {
    ButtonSecondary
  },
  data() {
    return {}
  },
  mounted() {},
  methods: {
    logout() {
      this.$userStore.logout()
      this.$router.replace('/auth')
    }
  }
}
</script>

<style scoped>
.navigation-bar {
  display: flex;
  align-items: center;
  backdrop-filter: blur(12px);
  background-color: rgba(255, 255, 255, 0.4);
  border-color: white;
  border-radius: 0px 0px 8px 8px;
  border-bottom-color: white;
  border-bottom-style: solid;
  border-bottom-width: 0.8px;
  border-top-color: rgb(255, 255, 255);
  border-top-style: solid;
  border-top-width: 0px;
  box-shadow:
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgba(0, 0, 0, 0) 0px 0px 0px 0px,
    rgb(255, 255, 255) 0px 5px 15px 0px;
  box-sizing: border-box;
  height: 64px;
  width: 100%;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
  position: fixed;
  line-height: 24px;
  z-index: 1;
}

.navigation-bar__dashboard {
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
}

.navigation-bar__dashboard--icon {
  margin-right: 8px;
}
.navigation-bar__dashboard--icon svg {
  color: red;
}
.navigation-bar__dashboard--title {
  font-family: 'Kanit', sans-serif;
  font-weight: 500;
}

.navigation-bar__logout {
  display: flex;
  position: relative;
  justify-content: center;
  width: 100px;
}

.navigation-bar__logout button {
  height: 40px;
  font-size: 0.9rem;
}
</style>
