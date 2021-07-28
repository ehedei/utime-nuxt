<template>
  <v-card-text class="px-10">
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      Name: <strong class="text-right">{{ getFullName || 'Unknown' }}</strong>
    </div>
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      Birthdate: <strong>{{ getBirthDate || 'Unknown' }}</strong>
    </div>
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      Mobile: <strong>{{ user.mobile || 'Unknown' }}</strong>
    </div>
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      Phone: <strong>{{ user.phone || 'Unknown' }}</strong>
    </div>
  </v-card-text>
</template>

<script>
const moment = require('moment')

export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  computed: {
    getFullName() {
      let fullName = ''
      fullName = this.user.firstName ? `${this.user.firstName} ` : fullName
      fullName = this.user.lastName
        ? `${fullName}${this.user.lastName}`
        : fullName

      return fullName
    },
    getDirection() {
      return this.user.address?.direction
    },
    getCity() {
      return this.user.address?.city
    },
    getCountry() {
      return this.user.address?.country
    },
    getState() {
      return this.user.address?.state
    },
    getBirthDate() {
      let date = ''

      if (this.user.birthdate) {
        date = moment(this.user.birthdate).format('DD-MM-YYYY')
      }

      return date
    },
  },
}
</script>
