<template>
  <v-container>
    <v-row justify="space-around">
      <DoctorCard
        v-for="(doctor, idx) in specialty.doctors"
        :key="idx"
        :doctor="doctor"
        @doctorSelected="selectDoctor"
      ></DoctorCard>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    specialty: Object,
  },
  methods: {
    selectDoctor(id) {
      this.$emit('selectDoctor', id)
    }
  }
};
</script>
