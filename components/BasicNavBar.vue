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
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>{{ title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="white" v-bind="attrs" v-on="on">
            <v-avatar>
              <img v-if="user.image" :src="user.image" :alt="user.username" />
              <v-icon v-else>mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>
        <v-card min-width="200px">
          <v-list-item-content class="justify-center">
            <div class="mx-auto text-center">
              <v-avatar color="indigo darken-4 white--text my-2">
                <img v-if="user.image" :src="user.image" :alt="user.username" />
                <v-icon v-else color="white">mdi-account</v-icon>
              </v-avatar>
              <h3>{{ user.username }}</h3>
              <p class="text-caption mt-1 mb-1">
                {{ user.email }}
              </p>
              <p v-if="user.role !== 'user'" class="text-caption">
                {{ user.role }}
              </p>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed block text to="/home"> <v-icon class="me-1">mdi-account-box-outline</v-icon> Profile </v-btn>
              <v-divider class="my-3"></v-divider>
              <v-btn depressed block text @click="logout"><v-icon class="me-1">mdi-exit-to-app</v-icon> Logout </v-btn>
            </div>
          </v-list-item-content>
        </v-card>
      </v-menu>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary light>
      <v-list nav dense>
        <v-list-item-group active-class="indigo--text text--accent-4">
          <v-list-item to="/home">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <!--
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
          -->
          <v-list-item to="/appointments">
            <v-list-item-icon>
              <v-icon>mdi-newspaper-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Appointments</v-list-item-title>
          </v-list-item>

          <v-list-item to="/appointments/new">
            <v-list-item-icon>
              <v-icon>mdi-pencil</v-icon>
            </v-list-item-icon>
            <v-list-item-title>New Appointment</v-list-item-title>
          </v-list-item>
          <v-list-item v-if="user.role !== 'user'" to="/appointments/create">
            <v-list-item-icon>
              <v-icon>mdi-calendar</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Create Appointments</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  data: () => ({
    title: 'UTime',
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
    },
  },
}
</script>

<style lang="scss" scoped>
#nav-bar {
  background-image: url('/img/navbar/svg.svg');
  background-position: center bottom;
  background-size: 100% 100%;
  transition: 0.3s ease;
}

#nav-bar.v-app-bar--is-scrolled {
  background-image: url('/img/navbar/profile.svg');
  background-color: red;
}
</style>