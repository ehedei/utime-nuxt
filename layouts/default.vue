<template>
  <v-app dark>
    <BasicNavBar></BasicNavBar>
    <v-main class="app-bg">
      <v-container fluid fill-height>
        <Nuxt />
      </v-container>
    </v-main>

  </v-app>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville&display=swap');
.app-bg {
  background: white
}

h1 {
  font-size: 3.5rem;
  font-family: 'Libre Baskerville', serif;
  letter-spacing: 2px;
}

.v-card__text,
.v-card__title {
  word-break: normal !important;
}
</style>