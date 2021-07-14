<template>
  <v-card :to="to" class="cnt white rounded-xl" elevation="6">
    <v-card-text>
      <v-row justify="center">
        <div class="try rounded pa-1 elevation-2">
          <v-icon size="40" color="white"> {{ src }} </v-icon>
        </div>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-row justify="center">
        <v-btn color="indigo darken-4" x-large text class="my-4 mx-0">
          {{ title }}
        </v-btn>
      </v-row>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    title: String,
    to: String,
    src: String,
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.try {
  background-color: #cd722e;
  transform: translateY(-50%) scale(2)
}

</style>