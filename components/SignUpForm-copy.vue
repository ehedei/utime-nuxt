<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="9" class="column">
        <v-form
          ref="form"
          v-model="valid"
          lazy-validation
          height="200px"
          class="scroll"
          data-aos="fade-up"
          @scroll.passive="onScroll"
        >
          <v-text-field
            v-model="username"
            :rules="requiredRules"
            class="whitetext"
            label="Username"
            required
          ></v-text-field>

          <v-text-field
            v-model="firstName"
            class="whitetext"
            label="Firstname"
            required
          ></v-text-field>

          <v-text-field
            v-model="lastName"
            class="whitetext"
            label="Lastname"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="Email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :rules="requiredRules"
            label="Password"
            required
          ></v-text-field>

          <v-text-field
            v-model="phone"
            label="Phone number"
            required
          ></v-text-field>

          <v-text-field
            v-model="mobilePhone"
            label="Mobile phone number"
            required
          ></v-text-field>

          <v-text-field
            v-model="direction"
            label="Direction"
            required
          ></v-text-field>

          <v-text-field v-model="city" label="City" required></v-text-field>

          <v-text-field v-model="state" label="State" required></v-text-field>

          <v-text-field
            v-model="country"
            label="Country"
            required
          ></v-text-field>

          <v-menu :close-on-content-click="true" max-width="290">
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                :value="computedDateFormattedMomentjs"
                clearable
                label="Select your birthday"
                readonly
                v-bind="attrs"
                v-on="on"
                @click:clear="date = null"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="date"
              @change="birthday = false"
            ></v-date-picker>
          </v-menu>

          <div class="d-flex justify-center pt-5 mt-5">
            <v-btn id="btn" color="success" class="mr-4" @click="validate">
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
    username: "",
    firstName: "",
    lastName: "",
    phone: "",
    mobilePhone: "",
    direction: "",
    city: "",
    state: "",
    country: "",
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
        phone: this.phone,
        mobile: this.mobilePhone,
        birthdate: this.date,
        firtName: this.firstName,
        lastName: this.lastName,
      };

      if (this.city && this.direction) {
        newUser.address = {
          city: this.city,
          direction: this.direction,
          country: this.country,
          state: this.state,
        };
      }

      const response = await this.$signup(newUser);
      console.log(response);
    },
    onScroll() {},
  },
};
</script>

<style scoped>
#btn {
  margin-right: 0 !important;
  color: white !important;
  background-color: red !important;
}
.scroll {
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
</style>
