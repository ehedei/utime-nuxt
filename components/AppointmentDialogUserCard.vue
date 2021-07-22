<template>
  <v-card-text class="px-10">
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      <div>
        Name: <strong>{{ getFullName || 'Unknown' }}</strong>
      </div>
      <div>
        Birthdate: <strong>{{ getBirthDate || 'Unknown' }}</strong>
      </div>
    </div>
    <div class="my-3 text-subtitle-1 d-flex justify-space-between">
      <div>
        Mobile: <strong>{{ user.mobile || 'Unknown' }}</strong>
      </div>
      <div>
        Phone: <strong>{{ user.phone || 'Unknown' }}</strong>
      </div>
    </div>
    <div class="mt-3 text-subtitle-1">Adress:</div>
    <div class="mt-2 mx-5 text-subtitle-4 d-flex justify-space-between">
      <span>Direction:</span><strong>{{ getDirection || 'Unknown' }}</strong>
    </div>
    <div class="mt-2 mx-5 text-subtitle-4 d-flex justify-space-between">
      <span>City:</span><strong>{{ getCity || 'Unknown' }}</strong>
    </div>
    <div class="mt-2 mx-5 text-subtitle-4 d-flex justify-space-between">
      <span>State:</span><strong>{{ getState || 'Unknown' }}</strong>
    </div>
    <div class="mt-2 mx-5 text-subtitle-4 d-flex justify-space-between">
      <span>Country:</span><strong>{{ getCountry || 'Unknown' }}</strong>
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

      if(this.user.birthdate) { date = moment(this.user.birthdate).format('DD-MM-YYYY') }

      return date
    }
  },
}
</script>