<template>
  <v-container fluid class="pt-16">
    <v-row justify="center">
      <v-col cols="12" md="5" v-for="(route, i) in getRoutes" :key="i" class="ma-8 justify-center">
        <CardButton class="mx-auto"
          :to="route.to"
          :title="route.title"
          :src="route.icon"
        ></CardButton>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      routes: [
        {
          icon: 'mdi-newspaper-variant',
          to: '/appointments',
          title: 'Appointments',
          allUsers: true
        },
        {
          icon: 'mdi-pencil',
          to: '/appointments/new',
          title: 'New Appointment',
          allUsers: true
        },
        {
          icon: 'mdi-calendar',
          to: '/appointments/create',
          title: 'Create Appointments',
        },
        {
          icon: 'mdi-room-service-outline',
          to: '/waiting-room',
          title: 'Waiting Room',
        },

      ]
    }
  },
  computed: {
    user() {
      return this.$auth.user
    },
    getRoutes() {
      if(this.$auth.user.role === 'user') {
        return this.routes.filter(el => el.allUsers)
      } else {
        return this.routes
      }
    }
  },
}
</script>
