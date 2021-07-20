<template>

    <v-container fluid fill-height class="container1">
      <v-row v-show="$vuetify.breakpoint.mdAndUp" class="row1">
        <v-col cols="6" class="pa-0"> </v-col>
        <v-col cols="6" class="columns">
          <v-container class="container2">
            <v-row justify="center" align-content="center">
              <v-col>
                <h1 class="text-center name">CLINIC VITA</h1>
                <p class="white--text text-center powered">Powered by Utime</p>
                <p class="text-center signUp">SignUp</p>
              </v-col>
            </v-row>
            <v-row justify="center" align-content="center">
              <v-col cols="7">
                <SignUpForm></SignUpForm>
              </v-col>
            </v-row>
            <v-row class="text-center" justify="center" align-content="center">
              <v-col>
                <NuxtLink to="/login" class="white--text"
                  >Already have an account?</NuxtLink
                >
              </v-col>
            </v-row>
          </v-container>
        </v-col>
      </v-row>
      <v-row v-show="$vuetify.breakpoint.smAndDown" class="row1">
        <v-col cols="12" class="columns">
          <v-container class="container2">
            <v-row justify="center" align-content="center">
              <v-col>
                <h1 class="text-center nameSmall">CLINIC VITA</h1>
                <p class="white--text text-center poweredSmall">
                  Powered by Utime
                </p>
                <p class="text-center signUpSmall">SignUp</p>
              </v-col>
            </v-row>
            <v-row justify="center" align-content="center">
              <v-col cols="9">
                <SignUpForm></SignUpForm>
              </v-col>
            </v-row>
            <v-row class="text-center" justify="center" align-content="center">
              <v-col>
                <NuxtLink to="/login" class="link"
                  >Already have an account?</NuxtLink
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
    name:'signUp',
    mode: 'in-out',
    },
  layout: 'starter',
  auth: false,
}
</script>

<style scoped>
.container1 {
  background-image: url('../static/img/backgroundSign.jpg');
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
.signUp {
  font-size: 2.5rem;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  margin-bottom: -10px;
  color: rgb(163, 202, 255);
  font-weight: bold;
}
.nameSmall {
  font-size: 2rem;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(122, 177, 255);
}
.signUpSmall {
  font-size: 1.5rem;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  margin-bottom: -10px;
  color: rgb(163, 202, 255);
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

.row1 {
  height: 100vh;
  margin: 0;
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

.name {
  font-size: 4.5rem;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(122, 177, 255);
}
.link {
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  color: white;
}
.signUp-enter-active, .signUp-leave-active {
  position: absolute;
    transition: all .3s ease;
  }

  /* entering start */
  .signUp-enter {
    left: -100%;
  }

  /* entering end */
  .signUp-enter-to {
    left: 0;
  }

  /* leaving start */
  .signUp-leave {
    opacity: 1;
  }

  /* leaving end */
  .signUp-leave-to {
  opacity: 0;
  }
</style>

<style>
.container {
  padding: 0;
}
</style>
