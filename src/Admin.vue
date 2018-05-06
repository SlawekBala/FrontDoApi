<template>
  <v-app>

    <div v-if="$store.state.loading" class="loader">
      <img :src="loadingGif">
    </div>

    <v-navigation-drawer
      persistent
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      enable-resize-watcher
      fixed
      app
    >
      <v-list>
        <v-list-tile
          value="true"
          v-for="(item, i) in items"
          :key="i"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      :clipped-left="clipped"
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>


      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="text-xs-center">
        <v-menu offset-y>
          <v-btn to="/basket" color="info" dark slot="activator">Koszyk {{added.length}}</v-btn>
          <!--<v-list>-->
            <!--<v-list-tile v-for="(item, key) in $store.state.added" :key="key" @click="">-->
              <!--<v-list-tile-title>{{ item.id }}</v-list-tile-title>-->
              <!--<v-btn @click="remove(item)" icon ripple>-->
                <!--<v-icon color="red">delete</v-icon>-->
              <!--</v-btn>-->
            <!--</v-list-tile>-->
          <!--</v-list>-->
        </v-menu>
      </div>
    </v-toolbar>
    <v-content>
      {{ $store.state}}
      <router-view/>
    </v-content>
    <v-navigation-drawer
      temporary
      :right="right"
      v-model="rightDrawer"
      fixed
      app
    >

    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <span class="moja">Kod Klepał Sławek &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex'
  import loadingGif from './assets/35.gif'
export default {
    data () {
    return {
        loadingGif: loadingGif,
      clipped: false,
      drawer: true,
      fixed: false,
      items: [{
        icon: 'bubble_chart',
        title: 'Inspire'
      }],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Front do API'
    }
  },
  computed: {
      ...mapGetters({
          added: 'added'
      })
  },
  name: 'Admin',
    methods: {

      remove (item) {
          let index = this.$store.state.added.indexOf(item)
          this.$store.state.added.splice(index, 1)
      }
    },
    created () {
        this.$store.dispatch('getBasket')
    }
}
</script>

<style scoped>
  .loader {
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,.5);
    position: absolute;
    z-index: 100;
  }

</style>
