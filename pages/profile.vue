<template>
  <v-container>
    <v-row class="d-flex justify-center">
      <v-col cols="10" lg="8">
        <div
          :class="[
            $vuetify.breakpoint.smAndDown
              ? 'profilePictureSmall'
              : 'profilePicture',
          ]"
        >
          <v-avatar
            color="indigo darken-4 white--text my-2 elevation-3"
            size="100"
          >
            <img v-if="user.image" :src="user.image" :alt="user.username" />
            <v-icon v-else color="white" size="60">mdi-account</v-icon>
          </v-avatar>
        </div>
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
            :placeholder="[
              user.username ? user.username : 'Introduce your username',
            ]"
            required
            clearable
            persistent-placeholder
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-email"
            v-model="email"
            class="inputtext"
            :rules="emailRules"
            label="Email"
            :placeholder="[user.email ? user.email : 'Introduce your email']"
            required
            clearable
            persistent-placeholder
          ></v-text-field>
          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-rename-box"
            v-model="firstName"
            class="inputtext"
            label="First name"
            :placeholder="[
              user.firstName ? user.firstName : 'Introduce your first name',
            ]"
            required
            clearable
            persistent-placeholder
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-rename-box"
            v-model="lastName"
            class="inputtext"
            label="Last name"
            :placeholder="[
              user.lastName ? user.lastName : 'Introduce your last name',
            ]"
            required
            clearable
            persistent-placeholder
          ></v-text-field>

          <v-text-field
            filled
            dense
            prepend-inner-icon="mdi-cellphone"
            v-model="mobile"
            class="app-inputtext inputtext"
            label="Phone number"
            :placeholder="[
              user.mobile ? user.mobile : 'Introduce your phone number',
            ]"
            required
            clearable
            persistent-placeholder
          ></v-text-field>

          <div class="d-flex justify-center">

          <div
            v-if="isEditPress"
            class="buttonWrapper d-flex justify-center pt-2 mt-2"
          >
            <v-btn
              elevation="3"
              height="40"
              class="button indigo"
              @click="editPress"
            >
              Edit
            </v-btn>
          </div>
          <div v-else class="buttonWrapper d-flex justify-space-around pt-2 mt-2">
            <v-btn
              elevation="3"
              height="40"
              class="button indigo"
              @click="editPress"
            >
              Cancel
            </v-btn>
            <v-btn
              elevation="3"
              height="40"
              class="button indigo"
              @click="editPress"
            >
              Save Changes
            </v-btn>
          </div>

          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'default',
  auth: false,
  data() {
    return {
      isEditPress: true,
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    editPress() {
      this.isEditPress = !this.isEditPress
    },
  },
}
</script>

<style scoped>
.buttonWrapper {
  width: 500px;
}

.profilePicture {
  text-align: center;
  margin-top: -50px;
  margin-bottom: 80px;
}
.profilePictureSmall {
  text-align: center;
  margin-bottom: 25px;
}
.button {
  margin-top: 10px;
  color: rgb(255, 255, 255) !important;
  width: 150px;
  height: 60px;
  border-radius: 12px;
  text-shadow: rgb(0 0 0 / 70%) 2px 2px 2px;
  margin-bottom: 10px;
  padding: 0%;
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
  width: 10px;
  left: -100px;
}
::-webkit-scrollbar-thumb {
  border: 2px solid rgba(0, 0, 0, 0);
  background-clip: padding-box;
  -webkit-border-radius: 100px;
  background-color: rgba(0, 0, 0, 0.15);
}
.v-form .v-text-field >>> .v-input__slot {
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
