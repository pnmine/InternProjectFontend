<template>
  <slot>
    <box-shadow class="wrapper" :class="{ 'move-right': !isLogin, left: isLogin }">
      <h1 v-if="isLogin" style="margin-top: 30%">Login</h1>
      <h1 v-else style="margin-top: 10%">Register</h1>
      <form @submit.prevent="save" class="form">
        <div class="form__input-box">
          <box-icon type="solid" name="user-circle"></box-icon>
          <input type="text" v-model="username" required />
          <label>Username</label>
        </div>
        <div class="form__input-box">
          <box-icon name="key"></box-icon>
          <input type="password" v-model="password" required />
          <label>Password</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="id-card"></box-icon>
          <input type="text" v-model="firstname" :required="!isLogin" />
          <label>Firstname</label>
        </div>
        <div class="form__input-box" v-show="!isLogin">
          <box-icon name="id-card"></box-icon>
          <input type="text" v-model="lastname" :required="!isLogin" />
          <label>Lastname</label>
        </div>
        <div class="form__input-radio" v-show="!isLogin">
          <label>Role</label>
          <input type="radio" v-model="role" value="1" :required="!isLogin" />
          <label>User</label>
          <input type="radio" v-model="role" value="0" :required="!isLogin" />
          <label>Admin</label>
        </div>
        <div class="form__submit-button">
          <button-primary v-if="isLogin" type="submit">Login</button-primary>
          <button-primary v-else type="submit">Register</button-primary>
        </div>
      </form>
    </box-shadow>
    <box-shadow class="wrapper" :class="{ 'move-left': isLogin, right: !isLogin }">
      <div v-if="!isLogin">
        <div class="content">
          <h1>Welcome Back?</h1>
          <p>All ready have an account?</p>
          <p style="margin-top: 10%">Click to Singup</p>
          <div style="margin-top: 5%" class="form__toggle-button">
            <button-secondary @click="toggle" :class="{ active: !isLogin }" type="button"
              >Login</button-secondary
            >
          </div>
        </div>
      </div>
      <div v-else>
        <div class="content">
          <h1>Hello?</h1>
          <p>Don't have an account?</p>
          <p style="margin-top: 10%">Click to join</p>
          <div style="margin-top: 5%" class="form__toggle-button">
            <button-secondary @click="toggle" :class="{ active: !isLogin }" type="button"
              >Register</button-secondary
            >
          </div>
        </div>
      </div>
    </box-shadow>
  </slot>
</template>
<script>
import axios from '../../axios.js'
import BoxShadow from '../ui/BoxShadow.vue'
import ButtonPrimary from '../ui/ButtonPrimary.vue'
import ButtonSecondary from '../ui/ButtonSecondary.vue'

export default {
  name: 'LoginRegisterForm',
  components: {
    BoxShadow,
    ButtonPrimary,
    ButtonSecondary
  },
  data() {
    return {
      isLogin: true,
      username: '',
      password: '',
      firstname: '',
      lastname: '',
      role: null,
      roleOption: [
        { title: 'User', value: 1 },
        { title: 'Admin', value: 0 }
      ]
    }
  },
  methods: {
    resetForm() {
      this.username = ''
      this.password = ''
      this.firstname = ''
      this.lastname = ''
      this.role = null
    },
    async save() {
      if (!this.isLogin) {
        console.log('register')
        var registerData = {
          username: this.username,
          password: this.password,
          firstname: this.firstname,
          lastname: this.lastname,
          role: this.role
        }
        await axios
          .post('/auth/register', registerData)
          .then((res) => {
            console.log(res.data)
            if (res.status == 200) {
              alert('Register successful')
              // this.resetForm()
              this.toggle()
            }
          })
          .catch((error) => {
            console.log(error)
            if (error.response.status == 400) {
              this.username = ''
              alert(error.response.data.message + 'Please try again')
            }
          })
      } else {
        console.log('login')
        var loginData = {
          username: this.username,
          password: this.password
        }
        await axios
          .post('/auth/login', loginData)
          .then((res) => {
            console.log(res.data)
            if (res.status == 200) {
              this.$userStore.login(
                res.data.data.token,
                res.data.data.tokenExpired,
                res.data.data.userId
              )
              //alert('Login successful')
              this.$router.push('/')
            }
          })
          .catch((error) => {
            console.log(error)
            this.password = ''
            alert(error.response.data.message + 'Please try again')
          })
      }
    },
    toggle() {
      this.isLogin = !this.isLogin
    }
  }
}
</script>
<style scoped>
.wrapper {
  min-width: 500px;
  min-height: 600px;
  border-radius: 12px 0px 0px 12px;
  transition: transform 0.3s ease;
}
.wrapper h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  text-align: center;
}
.wrapper.move-right {
  min-width: 500px;
  border-radius: 12px 0px 0px 12px;
  transition: transform 0.3s ease;
  transform: translateX(0%);
}
.wrapper.move-left {
  min-width: 500px;
  border-radius: 12px 0px 0px 12px;
  transform: translateX(-100%);
}
.wrapper.right {
  min-width: 450px;
  border-radius: 0px 12px 12px 0px;
  transform: translateX(0%);
}
.wrapper.left {
  min-width: 450px;
  border-radius: 0px 12px 12px 0px;
  transform: translateX(100%);
}
.wrapper .content {
  margin-top: 30%;
  text-align: center;
}
.wrapper .content p {
  color: var(--grey-400);
}

.form__toggle-button {
  display: flex;
  justify-content: center;
  width: 220px;
  margin: auto;
  position: relative;
}
.form__submit-button{
  margin: 1rem auto;
  width: 75%;
}
/* form */
form {
  text-align: center;
  transition: transform 0.5s ease;
}
.form__input-box {
  height: 50px;
  margin: 1.5rem auto;
  position: relative;
}
.form__input-box input {
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
.form__input-box input:focus {
  border: 1px solid var(--indigo-400);
}
.form__input-box label {
  left: 15.1%;
  top: 25%;
  margin-left: 2rem;
  position: absolute;
  pointer-events: none;
  transition: transform 1s ease-in-out;
}
.form__input-box input:focus ~ label,
.form__input-box input:valid ~ label {
  top: -1.5rem;
}
.form__input-box input:invalid ~ label {
}

.form__input-box box-icon {
  box-sizing: content-box;
  position: absolute;
  margin-left: 1rem;
  /* margin-top: 13px;  50% of the height but 24x24 = 50-24 = 26  ,26/2 =13 */
  transform: translateY(
    50%
  ); /* use percentage values: the percentage is relative to the element itself, and not the parent. */
}
</style>
