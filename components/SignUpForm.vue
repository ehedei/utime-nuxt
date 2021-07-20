<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col>
        <v-form
          data-aos="fade-up"
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
  </v-container>
</template>

<script>
import moment from "moment";
import { format, parseISO } from "date-fns";

export default {
  name: "SignUpForm",

  data: () => ({
    valid: true,
    passwordview: true,
    date: format(parseISO(new Date().toISOString()), "yyyy-MM-dd"),
    password: "",
    requiredRules: [(v) => !!v || "Field is required"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) =>
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
          v
        ) || "Email must be valid",
    ],
    passwordrepeatRules: [
      (v) => !!v || "Repeat password is required",
    ],
    username: "",
    firstName: "",
    lastName: "",
    repeatpassword: "",
    mobile: "",
  }),
  computed: {
    computedDateFormattedMomentjs() {
      return this.date ? moment(this.date).format("dddd, MMMM Do YYYY") : "";
    },
  },
  methods: {
    validate() {
      const validate = this.$refs.form.validate();
      if (validate) {
        this.signup();
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
      };

      const response = await this.$signup(newUser);
      if(response) this.$router.push('/login')
    }
  },
};
</script>

<style scoped>
#btn {
 margin-top: 30px;
  margin-right: 0 !important;
  color: white !important;
  background: linear-gradient(
    315deg,
    rgb(49, 170, 186) 0%,
    rgb(148, 56, 255) 100%
  ) !important;
  width: 120px;
  height: 40px;
  border-radius: 12px;
   text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
   margin-bottom: 10px;
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
.v-text-field >>>.v-icon {
    color: rgb(63, 63, 63) !important;
    margin-right: 8px;
}
</style>
