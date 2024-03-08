<template>
  <div class="text-center">
    <v-menu offset-y max-width="270">
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon small class="mt-2" v-bind="attrs" v-on="on">
          <v-icon>mdi-human-greeting-variant</v-icon>
        </v-btn>
      </template>
      <v-list class="py-0">
        <v-list-item :style="drawerStyles">
          <v-list-item-avatar>
                <v-img src="https://randomuser.me/api/portraits/men/88.jpg" />
              </v-list-item-avatar>
          <v-list-item-content>
          <v-list-item-title class="text-h6">
            User FullName
          </v-list-item-title>
          <v-list-item-subtitle>
            Courageous, Wise, Efficient
            <v-spacer/>
            <v-btn outlined rounded shaped class="mb-1">View Profile</v-btn>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <hr class="mt-3" />
        <v-list-item v-for="(item, index) in items" :key="index">
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
        <hr class="mt-3" />
        <v-list-item>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  data: () => ({
    drawerStyles: {
      backgroundImage: "url('/img/perseverant.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    },
    items: [
      { title: "Account Settings" },
      { title: "Articles" },
      { title: "Activities" },
      { title: "Notifications Settings" },
      { title: "Logout" },
    ],
  }),
};
</script>
