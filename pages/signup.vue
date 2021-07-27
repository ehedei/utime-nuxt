<template>
  <v-container fluid fill-height class="container1 d-flex align-stretch">
    <v-row class="row1">
      <v-col cols="12" md="6" sm="6" class="offset-md-6 offset-sm-6 columns">
        <v-container fluid fill-height class="container2">
          <v-row justify="center" align-content="center">
            <v-col>
              <h1
                :class="[
                  'text-center',
                  $vuetify.breakpoint.xsOnly ? 'nameMobile' : 'name',
                  $vuetify.breakpoint.smOnly ? 'nameSmall' : 'name',
                  'grey--text',
                  'text--lighten-5',
                ]"
              >
                CLINIC VITA
              </h1>
              <p
                :class="[
                  'orange--text',
                  'text--accent-1',
                  'text-center',
                  $vuetify.breakpoint.xsOnly ? 'poweredMobile' : 'powered',
                  $vuetify.breakpoint.smOnly ? 'poweredSmall' : 'powered',
                ]"
              >
                Powered by Utime
              </p>
            </v-col>
          </v-row>
          <v-row justify="center" align-content="center">
            <v-col cols="9" md="7">
              <p
                :class="[
                  'text-center',
                  $vuetify.breakpoint.xsOnly ? 'signUpMobile' : 'signUp',
                  $vuetify.breakpoint.smOnly ? 'signUpSmall' : 'signUp',
                  'indigo--text',
                  'text--lighten-5',
                ]"
              >
                SignUp
              </p>
              <SignUpForm></SignUpForm>
            </v-col>
          </v-row>
          <v-row class="text-center align-self-end" justify="center">
            <v-col>
              <NuxtLink to="/login" class="white--text"
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
    name: 'signUp',
    mode: 'out-in',
  },
  layout: 'starter',
  auth: false,
}
</script>

<style scoped>
.container1 {
  background-image: url('https://res.cloudinary.com/dfuhm3pot/image/upload/v1627024921/utime/backgrounds/backgroundSign_ium2tr.jpg');
  background-size: cover;
  position: relative;
}
.signUp {
  font-size: 3rem;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  color: rgb(163, 202, 255);
  font-weight: bold;
  margin-bottom: 4vh;
  margin-top: -2vh;
}
.name {
  font-size: 4.5rem;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(122, 177, 255);
  margin-top: 5vh;
}
.powered {
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-style: italic;
  font-size: 1.2rem;
  margin-top: -1.5vh;
}
.nameMobile {
  font-size: 10vw;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(122, 177, 255);
}
.signUpMobile {
  font-size: 9vw;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  color: rgb(163, 202, 255);
  margin-bottom: 5vh;
  font-weight: bold;
}
.poweredMobile {
  margin-top: -5px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-style: italic;
  font-size: 4vw;
}
.nameSmall {
  font-size: 7vw;
  text-shadow: rgb(0 0 0 / 20%) 3px 3px 3px;
  color: rgb(122, 177, 255);
  margin-top: -1vh;
}
.signUpSmall {
  font-size: 4vw;
  text-shadow: rgb(0 0 0 / 20%) 2px 2px 2px;
  color: rgb(163, 202, 255);
  margin-bottom: 2vh;
  font-weight: bold;
}
.poweredSmall {
  margin-top: -5px;
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  font-style: italic;
  font-size: 2.2vw;
}

.row1 {
  margin: 0;
}
.giftColumn {
  overflow: hidden;
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
  flex-direction: row;
  align-content: space-around;
}

.link {
  text-shadow: rgb(0 0 0 / 20%) 1px 1px 1px;
  color: white;
}

.signUp-enter-active,
.signUp-leave-active {
  transition: all 0.3s ease-out;
}
.signUp-enter {
  left: -100%;
}
.signUp-enter-to {
  left: 0;
}
</style>
