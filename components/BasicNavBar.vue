<template>
    <v-app-bar
      id="nav-bar"
      app
      flat
      dark
      shrink-on-scroll
      extended
      height="60%"


      color="transparent"

          >

      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{title}}</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-menu
        bottom
        left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            color="white"
            v-bind="attrs"
            v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
            v-for="(item, i) in items"
            :key="i"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
</template>


<script>
  export default {
    data: () => ({
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      title: 'UTime'
    }),

  }
</script>

<style lang="scss" scoped>
#nav-bar {
  background-image: url('/img/navbar/svg.svg');
  background-position: center bottom;
  background-size: 100% 100%;
  transition: 0.3s ease;
}

#nav-bar.v-app-bar--is-scrolled {
  background-image: url('/img/navbar/profile.svg');
}
</style>