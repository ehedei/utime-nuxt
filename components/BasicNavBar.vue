<template>
  <div>
    <v-app-bar
      id="nav-bar"
      app
      flat
      dark
      shrink-on-scroll
      extended
      height="60%"
      color="transparent"
    >
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-avatar>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="200px">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="indigo darken-4 white--text my-2 elevation-3">
                <img v-if="user.image" :src="user.image" :alt="user.username" cover/>
                <v-icon v-else color="white">mdi-account</v-icon>
              </v-avatar>
              <h3 class="mt-1">{{ user.username }}</h3>
              <p class="text-caption mt-1 mb-1">
                {{ user.email }}
              </p>
              <p v-if="user.role !== 'user'" class="text-caption">
                {{ user.role }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed block text to="/profile">
                <v-icon class="me-1">mdi-account-box-outline</v-icon> Profile
              </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed block text @click="logout"
                ><v-icon class="me-1">mdi-exit-to-app</v-icon> Logout
              </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>

      <v-toolbar-title to="/home" class="d-flex align-center pb-1 nav-title" @click="goHome"
        >
        <v-img
          max-height="42"
          max-width="42"
          class="mr-2"
          src="https://res.cloudinary.com/dfuhm3pot/image/upload/v1627049153/utime/logos/vita-white_c35oav.svg"
        ></v-img
        ><span>{{ title }}</span></v-toolbar-title
      >

      <v-spacer></v-spacer>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" right app temporary light>
      <v-list nav dense>
        <v-list-item-group active-class="indigo--text text--accent-4">
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/appointments">
            <v-list-item-icon>
              <v-icon>mdi-newspaper-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Appointments</v-list-item-title>
          </v-list-item>

          <v-list-item
            to="/appointments/new"
            active-class="orange--text text--darken-3"
          >
            <v-list-item-icon class="ml-3">
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New Appointment</v-list-item-title>
          </v-list-item>

          <v-list-item
            v-if="user.role !== 'user'"
            to="/appointments/create"
            active-class="cyan--text text--darken-3"
          >
            <v-list-item-icon class="ml-3">
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Appointments</v-list-item-title>
          </v-list-item>

          <v-list-item v-if="user.role !== 'user'" to="/waiting-room">
            <v-list-item-icon>
              <v-icon>mdi-room-service</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Waiting Room</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'Clinic Vita',
    drawer: false,
  }),
  computed: {
    user() {
      return this.$auth.user
    },
  },
  methods: {
    logout() {
      this.$auth.logout()
      this.$router.push('/login')
    },
    goHome() {
      this.$router.push('/home')
    }
  },
}
</script>

<style lang="scss" scoped>
#nav-bar {
  background-image: url('https://res.cloudinary.com/dfuhm3pot/image/upload/v1627024892/utime/navbar/wave_bfcdaw.svg');
  background-position: center top;
  background-size: 100% 100%;
  transition: 0.3s ease;
  filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.5));
}

#nav-bar.v-app-bar--is-scrolled {
  background-image: url('https://res.cloudinary.com/dfuhm3pot/image/upload/v1627024892/utime/navbar/dense_crqrjk.svg');
  background-color: red;
}

.nav-title {
    font-family: 'Josefin Sans', sans-serif;
    cursor: pointer;
}
</style>