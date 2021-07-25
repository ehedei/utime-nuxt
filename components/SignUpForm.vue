<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          height="200px"
          class="scroll"
          @scroll.passive="onScroll"
        >
          <v-text-field
            dense
            filled
            prepend-inner-icon="mdi-account"
            v-model="username"
            :rules="requiredRules"
            class="inputtext"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-email"
            v-model="email"
            class="inputtext"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>
          <v-text-field
            class="inputtext"
            filled
            dense
            prepend-inner-icon="mdi-lock"
            :type="passwordview ? 'password' : 'text'"
            :append-icon="passwordview ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append="passwordview = !passwordview"
            v-model="password"
            :rules="requiredRules"
            label="Password"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-lock"
            :type="passwordview ? 'password' : 'text'"
            :append-icon="passwordview ? 'mdi-eye-off' : 'mdi-eye-outline'"
            @click:append="passwordview = !passwordview"
            v-model="repeatpassword"
            class="inputtext"
            :rules="passwordrepeatRules"
            label="Repeat password"
            required
          ></v-text-field>
          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-rename-box"
            v-model="firstName"
            class="inputtext"
            label="Firstname"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-rename-box"
            v-model="lastName"
            class="inputtext"
            label="Lastname"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-cellphone"
            v-model="mobile"
            class="app-inputtext inputtext"
            label="Mobile phone number"
            required
          ></v-text-field>

          <div class="d-flex justify-center pt-2 mt-2">
            <v-btn
              elevation="3"
              class="button indigo"
              @click="validate"
            >
              SignUp
            </v-btn>
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
              <v-btn color="indigo darken-1" text @click="closeModal">
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
import moment from 'moment'
import { format, parseISO } from 'date-fns'

export default {
  name: 'SignUpForm',

  data: () => ({
    dialog: false,
    message: '',
    userCreated: false,
    valid: true,
    passwordview: true,
    date: format(parseISO(new Date().toISOString()), 'yyyy-MM-dd'),
    password: '',
    requiredRules: [(v) => !!v || 'Field is required'],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || 'Email must be valid',
    ],
    passwordrepeatRules: [(v) => !!v || 'Repeat password is required'],
    username: '',
    firstName: '',
    lastName: '',
    repeatpassword: '',
    mobile: '',
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format('dddd, MMMM Do YYYY') : ''
    },
  },
  methods: {
    closeModal() {
      this.dialog = false

      if (this.userCreated) {
        this.$router.push('/login')
      }
    },
    validate() {
      const validate = this.$refs.form.validate()
      if (validate) {
        this.signup()
      }
    },
    async signup() {
      const newUser = {
        username: this.username.trim(),
        email: this.email.trim().toLowerCase(),
        password: this.password,

        mobile: this.mobile.trim(),

        firstName: this.firstName.trim(),
        lastName: this.lastName.trim(),
      }

      try {
        await this.$signup(newUser)
        this.message = 'User created'
        this.userCreated = true
      } catch (error) {
        this.message = 'Something goes wrong. Try again!'
      }
      this.dialog = true
    },
  },
}
</script>

<style scoped>
.button {
  margin-top: 10px;
  color: rgb(255, 255, 255) !important;
  width: 120px;
  height: 40px;
  border-radius: 12px;
  text-shadow: rgb(0 0 0 / 70%) 2px 2px 2px;
  margin-bottom: 10px;
  padding: 0%;
}
.scroll {
  height: 45vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #f5f5f500;
}

::-webkit-scrollbar {
   width: 10px; left:-100px;
}
::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.15);
}
.v-form
.v-text-field >>> .v-input__slot {
  background: rgb(255, 255, 255) !important;

}
.v-text-field >>> .v-input__slot::before {
  border-style: none;
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
.inputtext {
  border-radius: 10px;
}
</style>
