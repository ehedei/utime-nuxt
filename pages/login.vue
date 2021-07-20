<template>
  <v-container fluid fill-height class="container1">
    <v-row v-show="$vuetify.breakpoint.mdAndUp" class="row1">
      <v-col cols="6" class="columns">
        <v-container class="container2">
          <v-row justify="center" align-content="center">
            <v-col>
              <h1 class="text-center name">CLINIC VITA</h1>
              <p class="white--text text-center powered">Powered by Utime</p>
              <p class="text-center Login">Login</p>
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
      <v-col cols="6"> </v-col>
    </v-row>
    <v-row v-show="$vuetify.breakpoint.smAndDown" class="row1">
      <v-col cols="12" class="columns">
        <v-container class="container2">
          <v-row justify="center" align-content="center">
            <v-col>
              <h1 class="text-center name">CLINIC VITA</h1>
              <p class="white--text text-center powered">Powered by Utime</p>
              <p class="text-center Login">Login</p>
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
  transition: {
    name:'login',
    mode: 'in-out',
    },
  layout: 'starter',
  auth: false,
}
</script>

<style scoped>
.container1 {
  background-image: url('../static/img/background.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.Login {
  font-size: 2.5rem;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  margin-bottom: -40px;
  color: rgb(163, 202, 255);
  font-weight: bold;
}
.name {
  font-size: 4.5rem;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(198, 222, 255);
}
.nameSmall {
  font-size: 2rem;
}
.LoginSmall {
  font-size: 1.5rem;
  margin-bottom: -10px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  color: rgb(202, 255, 255);
  font-weight: bold;
}
.powered {
  margin-top: -10px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-style: italic;
  font-size: 1.2rem;
}
.poweredSmall {
  margin-top: -5px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-style: italic;
  font-size: 1rem;
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

.login-enter-active,
.login-leave-active {
  position: absolute;
  transition: all .3s ease;
}

/* entering start */
.login-enter {
  right: -100%;
}

/* entering end */
.login-enter-to {
  right: 0;
}

/* leaving start */
.login-leave {
  opacity: 1;
}

/* leaving end */
.login-leave-to {
  opacity: 0;
}
</style>

<style>
.container {
  padding: 0;
}
</style>
