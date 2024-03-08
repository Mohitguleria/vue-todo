<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :mobile-breakpoint="768"
      app>
      <v-list-item :style="drawerStyles">
          <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/88.jpg" />
              </v-list-item-avatar>
          <v-list-item-content>
          <v-list-item-title class="text-h6">
            User FullName
          </v-list-item-title>
          <v-list-item-subtitle>
            View Profile
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      src="./assets/perseverant.webp"
      color="primary"
      prominent
      dark
      height="150"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="appbar-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer = !drawer" class="ml-n3"></v-app-bar-nav-icon>
          <v-spacer/>
          <Search @modify-spacer="modifySpacer"/>
          <v-spacer v-if="spacerAllowed" />
          <ProfileDropdown />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4">Welcome, User</v-toolbar-title>
        </v-row>
        <v-row>
          <LiveDayTime />
        </v-row>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view/>
      <Snackbar />
    </v-main>
  </v-app>
</template>

<script>
import Snackbar from '@/components/Shared/Snackbar.vue'
import Search from '@/components/tools/Search.vue'
import ProfileDropdown from '@/components/Shared/ProfileDropdown.vue'
import LiveDayTime from '@/components/tools/LiveDayTime.vue'
export default {
  name: 'App',

  data: () => ({
    drawer: null,
    drawerStyles: {
      backgroundImage: "url('/img/perseverant.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    spacerAllowed: false,
    items: [
      {
        title: 'Todo',
        icon: 'mdi-format-list-checks',
        to: '/todo'
      },
      {
        title: 'Discuss',
        icon: 'mdi-forum',
        to: '/discuss'
      },
      {
        title: 'About',
        icon: 'mdi-help-box',
        to: '/about'
      },
    ]
  }),
  methods: {
    modifySpacer(searchClosed){
      this.spacerAllowed = !searchClosed
    },
  },
  components:{
    Snackbar,
    Search,
    ProfileDropdown,
    LiveDayTime,
  }
};
</script>
<style>
  .appbar-container {
    max-width: none !important;
  }
</style>