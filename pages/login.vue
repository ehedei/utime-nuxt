<template>
  <v-container fluid fill-height class="container1">
    <v-row v-show="$vuetify.breakpoint.mdAndUp" class="row1">
      <v-col cols="6" class="columns">
        <v-container class="container2">
          <v-row justify="center" align-content="center">
            <v-col>
              <h1 class="white--text text-center">Login</h1>
            </v-col>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-col cols="6">
              <LoginForm></LoginForm>
            </v-col>
          </v-row>
          <v-row class="text-center" justify="center" align-content="center">
            <v-col>
              <NuxtLink to="/signup" class="link"
                >Create a new account</NuxtLink
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <v-col cols="6">

      </v-col>
    </v-row>
    <v-row v-show="$vuetify.breakpoint.smAndDown" class="row1">
      <v-col cols="12" class="columns">
        <v-container class="container2">
          <v-row justify="center" align-content="center">
            <v-col>
              <h1 class="white--text text-center">Login</h1>
            </v-col>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-col cols="9">
              <LoginForm></LoginForm>
            </v-col>
          </v-row>
          <v-row class="text-center" justify="center" align-content="center">
            <v-col>
              <NuxtLink to="/signup" class="link"
                >Create a new account</NuxtLink
              >
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'starter',
  auth: false,
}
</script>

<style scoped>
.container1 {
  background-image: url('../static/img/background.jpeg');
  background-size: 100% 100%;
  background-repeat: no-repeat;

}
.image {
  width: 40vw;
}

.row1 {
  height: 100vh;
  margin: 0;
}
.rowImage {
  height: 100vh;
}
.giftColumn {
  overflow: hidden;
    height: 100vh;
}
.Video {
  height: 100vh;

}
.columns {
  background: rgb(71, 68, 68);
  background: radial-gradient(
    circle,
    rgba(71, 68, 68, 0.4962359943977591) 36%,
    rgba(56, 56, 62, 0.7511379551820728) 63%,
    rgba(0, 0, 0, 0.7147233893557423) 87%
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  backdrop-filter: blur(12px);
}
.container2 {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  height: 80vh;
}

h1 {
  font-size: 4.5rem;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
}
.link {
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  color: white;
}
</style>

<style>
.container {
  padding: 0;
}
</style>
