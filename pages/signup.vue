<template>
<v-container fluid fill-height>
  <v-row>
    <v-col cols="12" >
    <h1 class="white--text text-center">Sign Up</h1>
    </v-col>
  </v-row>
  <v-row>
    <v-col cols="12">
    <SignUpForm></SignUpForm>
    </v-col>
  </v-row>
  <v-row>
    <v-col class="text-center">
    <NuxtLink to="/login" class="white--text">Already have an account?</NuxtLink>
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