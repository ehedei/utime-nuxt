<template>
  <v-container>
    <v-row justify="space-around">
      <SpecialtyCard v-for="(specialty, idx) in specialties" :key="idx" :specialty="specialty" @specialtySelected="selectSpecialty"></SpecialtyCard>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    props: {
      specialties: Array
    },
    methods: {
      selectSpecialty(id) {
        this.$emit('specialtySelected', id)
      }
    }
  }
</script>
