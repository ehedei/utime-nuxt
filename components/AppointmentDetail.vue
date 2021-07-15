<template>
  <v-card hover :class="['my-2', 'px-5', 'py-1', 'rounded', 'd-flex', 'justify-space-between', 'pink', today ? 'lighten-5' : 'lighten-4']" :to="getRoute" >
    <div>
      <span>{{ getDate }}</span>
    </div>
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
      return moment(this.appointment.start).format("LT");
    },
    getDate() {
      return moment(this.appointment.start).format("DD/MM/YYYY");
    },
    getRoute() {
      return `/appointments/${this.appointment.booking}`
    }
  },
};
</script>