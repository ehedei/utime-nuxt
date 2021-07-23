<template>
  <v-hover>
    <template v-slot:default="{ hover }">
      <v-card
        width="150px"
        class="
          ma-4 ma-sm-6 ma-md-8
          elevation-4
          d-flex
          flex-column
          justify-space-between
        "
        :elevation="hover ? 8 : 4"
        @click="selectDoctor"
      >
        <v-card-title class="text-center">{{ doctor.name }}</v-card-title>
        <v-card-text class="text-center justify-center">
          <div class="d-flex justify-center mb-6">
            <v-img max-height="100" max-width="100" :src="getImage"></v-img>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: {
    doctor: Object,
  },
  data() {
    return {
      image:
        'https://res.cloudinary.com/dfuhm3pot/image/upload/v1626989983/utime/doctor/default_doctor_lsvqdf.png',
    }
  },
  computed: {
    getImage() {
      return this.doctor.image || this.image
    },
  },
  methods: {
    selectDoctor() {
      this.$emit('doctorSelected', this.doctor._id)
    },
  },
}
</script>
