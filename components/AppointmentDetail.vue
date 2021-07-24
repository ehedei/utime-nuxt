<template>
  <v-card hover :class="['my-2', 'px-5', 'py-1', 'rounded', 'd-flex', 'justify-center', 'orange', today ? 'lighten-5' : 'lighten-4']" :to="getRoute" >
    <div>
      <span>{{ getTime }}</span>
    </div>
  </v-card>
</template>

<script>
const moment = require("moment");
export default {
  props: {
    appointment: Object,
    today: {
      type: Boolean,
      default: false }
  },
  computed: {
    getTime() {
      return moment.utc(this.appointment.start).format("LT");
    },
    getRoute() {
      return `/appointments/${this.appointment.booking}`
    }
  },
};
</script>