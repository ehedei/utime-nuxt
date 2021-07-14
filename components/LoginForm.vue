<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="6" md="4">
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
    <template>
      <v-row justify="center">
        <v-dialog v-model="dialog" persistent max-width="290">
          <v-card>
            <v-card-title class="text-h5"> Login </v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="indigo darken-1" text @click="dialog = false">
                Accept
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
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
  background-color: #283593 !important;
  width: 120px;
  height: 40px;
  border-radius: 12px;
}
#btn2 {
  margin-top: 30px;
  margin-right: 0 !important;
  color: white !important;
  background-color: transparent !important;
  font-size: 12px;
}
.v-text-field >>> .v-input__slot {
  background: rgba(255, 255, 255, 1) !important;
}

.v-text-field >>> .error--text {
  color: rgba(0, 0, 0, 0.7) !important;
}
.v-application .error--text {
  caret-color: #000 !important;
}
.v-text-field >>> .v-label {
  color: rgba(0, 0, 0, 0.8) !important;
}
.v-text-field >>> .v-messages__message {
  padding-left: 12px;
}
</style>
