<template>
  <v-card data-aos="zoom-in"
    width="150px"
    class="ma-4 ma-sm-6 ma-md-8 elevation-4 d-flex flex-column justify-space-between"
    @click="selectDoctor"
  >
    <v-card-title class="text-center">{{ doctor.name }}</v-card-title>
    <v-card-text class="text-center justify-center">
      <div class="d-flex justify-center mb-6">
        <v-img max-height="100" max-width="100" :src="image"></v-img>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    doctor: Object,
  },
  data() {
    return {
          image: '/img/doctor-xs.png'
    }
  },
  methods: {
    selectDoctor() {
      this.$emit("doctorSelected", this.doctor._id);
    },
  },
};
</script>
