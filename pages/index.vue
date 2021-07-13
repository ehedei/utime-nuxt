<template>
<v-container fill-height>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text text-center">UTime</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex justify-center align-center">
        <div>
          <v-img height="150" width="150" :src="logo"></v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" class="white--text my-3">
        <p class="text-center">Get your appointments in time</p>
        <p class="text-center">Forget about queues</p>
        <p class="text-center">Be owner of your time</p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="6" md="4">
        <v-btn v-if="auth"
          block
          color="white"
          rounded
          class="cyan--text darken-5"
          x-large
          to="/home"
        >
          Home
        </v-btn>
        <v-btn
          v-else
          block
          color="white"
          rounded
          class="cyan--text darken-5"
          x-large
          to="/signup"
        >
          Create an account
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!auth">
      <v-col class="text-center">
        <NuxtLink to="/login" class="white--text"
          >I already have an account</NuxtLink
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'starter',
  auth: false,
  data() {
    return {
      logo: '/img/main-logo.svg',
      auth: this.$auth.loggedIn
    }
  },
}
</script>