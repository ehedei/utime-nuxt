<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12">
        <h1 class="white--text text-center">Login</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <LoginForm></LoginForm>
      </v-col>
    </v-row>
    <v-row>
      <v-col class="text-center">
        <NuxtLink to="/signup" class="white--text"
          >Create a new account</NuxtLink
        >
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'starter',
  auth: false
};
</script>