<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field
            v-model="email"
            filled
            rounded
            dense
            prepend-inner-icon="mdi-email"
            :rules="emailRules"
            class="whitetext"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            filled
            rounded
            dense
            prepend-inner-icon="mdi-lock"
            :rules="passwordRules"
            type="password"
            label="Password"
            required
          ></v-text-field>
          <div class="d-flex align-center flex-column">
            <v-btn id="btn1" elevation="4" class="mr-4" @click="validate">
              Login
            </v-btn>

            <v-btn id="btn2" text class="mr-4"> Forgot your password? </v-btn>
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'LoginForm',

  data: () => ({
    dialog: false,
    message: '',
    valid: true,
    password: '',
    passwordRules: [(v) => !!v || 'Password is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'Email must be valid',
    ],
  }),
  methods: {
    validate() {
      const validate = this.$refs.form.validate()
      if (validate) {
        this.Login()
      }
    },
    async Login() {
      const userData = {
        email: this.email,
        password: this.password,
      }

      try {
        await this.$auth.loginWith('local', { data: userData })

        this.$router.push('/home')
      } catch (err) {
        if (err.response.status === 401) {
          this.message = 'User and password do not match'
        } else {
          this.message = 'Something goes wrong. Try again!'
        }
        this.dialog = true
      }
    },
  },
}
</script>

<style scoped>
#btn1 {
  margin-top: 30px;
  margin-right: 0 !important;
  color: white !important;
  background: linear-gradient(
    -135deg,
    rgb(49, 170, 186) 0%,
    rgb(148, 56, 255) 100%
  ) !important;
  width: 120px;
  height: 40px;
  border-radius: 12px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
#btn2 {
  margin-top: 30px;
  margin-right: 0 !important;
  color: white !important;
  background-color: transparent !important;
  font-size: 13px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.v-text-field >>> .v-input__slot {
  background: rgb(255, 255, 255) !important;
}

.v-text-field >>> .error--text {
  color: rgb(255, 255, 255) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.v-application .error--text {
  caret-color: rgb(255, 0, 0) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.v-text-field >>> .v-label {
  color: rgba(0, 0, 0, 0.8) !important;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-size: 1rem;
}
.v-text-field >>> .v-messages__message {
  padding-left: 12px;
}
.v-text-field >>> .v-icon {
  color: rgb(63, 63, 63) !important;
  margin-right: 8px;
}
</style>
