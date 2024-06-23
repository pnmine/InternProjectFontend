<template>
  <div class="auth__container">
    <auth-form></auth-form>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm/Form.vue'
export default {
  name: 'AuthView',
  components: {
    AuthForm
  },
  async mounted() {
    await this.$userStore.logon()
    console.log('this.isLoggedIn', this.isLoggedIn)
    if (this.isLoggedIn) {
      this.$router.push('/')
    }
  },
  computed: {
    isLoggedIn() {
      this.$userStore.logon()
      return this.$userStore.loggedIn
    }
  }
}
</script>
<style scoped>
.auth__container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: var(--grey-050);
}
</style>
