<template>
  <v-card
    width="150px"
    class="mx-2 my-4 ma-sm-6 ma-md-8 elevation-4"
    hover
    @click="selectSpecialty"
  >
    <v-card-text class="text-center justify-center">
      <div class="d-flex justify-center mb-6">
        <v-img max-height="100" max-width="100" :src="specialty.image"></v-img>
      </div>
      <h2>{{ getTitle }}</h2>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    specialty: Object,
  },
  computed: {
    getTitle() {
      return this.specialty.name.toUpperCase();
    },
  },
  methods: {
    selectSpecialty() {
      this.$emit("specialtySelected", this.specialty._id)
    },
  },
};
</script>
