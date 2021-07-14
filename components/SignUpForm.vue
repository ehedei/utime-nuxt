<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="12" sm="8" md="10" lg="10">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          height="400px"
          class="scroll"
          @scroll.passive="onScroll"
        >
          <v-text-field
            dense
            rounded
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
            rounded
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
            rounded
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
            rounded
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
            rounded
            prepend-inner-icon="mdi-rename-box"
            v-model="firstName"
            class="inputtext"
            label="Firstname"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            rounded
            prepend-inner-icon="mdi-rename-box"
            v-model="lastName"
            class="inputtext"
            label="Lastname"
            required
          ></v-text-field>

          <v-text-field
            filled
            dense
            rounded
            prepend-inner-icon="mdi-cellphone"
            v-model="mobile"
            class="app-inputtext"
            label="Mobile phone number"
            required
          ></v-text-field>

          <div class="d-flex justify-center pt-2 mt-2">
            <v-btn
              elevation="4"
              id="btn"
              color="success"
              class="mr-4"
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

      if(this.userCreated) {
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
        username: this.username,
        email: this.email,
        password: this.password,

        mobile: this.mobilePhone,

        firtName: this.firstName,
        lastName: this.lastName,
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
#btn {
  margin-right: 0 !important;
  color: white !important;
  background-color: #283593 !important;
  border-radius: 12px;
  margin-bottom: 12px;
  width: 120px;
  height: 40px;
}
.scroll {
  height: 50vh;
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0);
  border-radius: 10px;
  background-color: #f5f5f500;
}

::-webkit-scrollbar {
  width: 30px;
}
::-webkit-scrollbar-thumb {
  border: 12px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.15);
}
.v-text-field >>> .v-input__slot {
  background: rgb(255, 255, 255) !important;
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
