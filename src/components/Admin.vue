<template>
  <v-tabs :centered=true :grow=true color="#1C2B32" dark slider-color="#E1E4E3">
    <v-tab ripple>Users</v-tab>
      <v-tab-item>
        <v-card flat><Users /></v-card>
      </v-tab-item>
    <v-tab ripple>Tenants</v-tab>
      <v-tab-item>
        <v-card flat><Users /></v-card>
      </v-tab-item>
    <v-tab ripple>User Access</v-tab>
      <v-tab-item>
        <v-card flat><Users /></v-card>
      </v-tab-item>
  </v-tabs>
</template>

<script>
import Users from './Users'

export default {
  name: 'Admin',
  components: {
    Users
  }
}
</script>

<style scoped>
.v-tabs {
  width: 100%!important;
}
</style>
