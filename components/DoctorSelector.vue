<template>
  <v-container>
    <v-row justify="space-around">
      <DoctorCard
        v-for="(doctor, idx) in getDoctors"
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
  },
  computed: {
    getDoctors() {
      return this.specialty.doctors?.slice().sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        return (nameA < nameB) ? -1 : (nameA > nameB) ? 1 : 0;
      })
    }
  }
};
</script>
