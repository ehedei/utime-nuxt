<template>
  <v-container fill-height>
    <v-combobox
      v-model="selectedDoctors"
      class="align-self-start mt-8 mx-5"
      :items="doctors"
      item-text="name"
      label="Select Doctors"
      multiple
      hide-selected
      deletable-chips
      chips
      filled
      clearable
      solo
      background-color="white"
      color="indigo"
      @change="selectDoctor"
    >
    </v-combobox>
    <v-row justify="center">
      <Queue
        v-for="doctor in selectedDoctors"
        :key="doctor._id"
        :doctor="doctor"
        :appointments="doctor.appointments"
        :socket="socket"
        @passTurn="passTurn"
      ></Queue>
    </v-row>
  </v-container>
</template>

<script>
export default {
  middleware: ['advancedprivileges'],
  async asyncData(context) {
    try {
      const doctors = await context.$getDoctors()
      return { doctors }
    } catch (error) {
      alert('Doctors are not available')
    }
  },
  data() {
    return {
      selectedDoctors: [],
      socket: null,
    }
  },
  methods: {
    passTurn(doctorId) {
      console.log(doctorId)
    },
    selectDoctor() {
      this.socket.emit('something', this.doctors)
    },
  },
  mounted() {
    const token = this.$auth.strategy.token.get()

    this.socket = this.$nuxtSocket({
      name: 'main',
      extraHeaders: { Authorization: token },
    })
  },
}
</script>
