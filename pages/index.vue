<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" class="d-flex flex-column flex-sm-row justify-center align-center mt-10">
        <v-img v-if="$vuetify.breakpoint.xsOnly" max-height="70" max-width="70" class="order-2 order-sm-1" :src="logo"></v-img>
        <v-img v-else max-height="150" max-width="150" class="order-2 order-sm-1" :src="logo"></v-img>
        <h1 class="indigo--text text--darken-3 text-center ml-sm-3 order-1 order-sm-2">CLINIC VITA</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="d-flex flex-column justify-center align-center ">
        <h2 class="indigo--text text-center font-weight-medium">
          <em>Powered by Utime</em>
        </h2>
        <div class="mt-3">
          <v-img height="48" width="45" :src="utimelogo"></v-img>
        </div>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" class="indigo--text my-3 text--darken-3">
        <p class="text-center">Get your appointments in time</p>
        <p class="text-center">Forget about queues</p>
        <p class="text-center">Be owner of your time</p>
      </v-col>
    </v-row>
    <v-row class="d-flex justify-center align-center">
      <v-col cols="12" sm="6" md="4">
        <v-btn v-if="auth" block color="indigo" dark rounded x-large to="/home">
          Home
        </v-btn>
        <v-btn v-else block color="indigo" rounded dark x-large to="/signup">
          Create an account
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="!auth">
      <v-col class="text-center">
        <NuxtLink to="/login" class="indigo--text"
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
      logo: 'https://res.cloudinary.com/dfuhm3pot/image/upload/v1627048988/utime/logos/vita_r5npxv.svg',
      utimelogo: 'https://res.cloudinary.com/dfuhm3pot/image/upload/v1627049063/utime/logos/utime-gold_qnkidh.svg',
      auth: this.$auth.loggedIn,
    }
  },
}
</script>