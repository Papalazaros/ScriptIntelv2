<template>
  <v-container fluid>
      <v-layout row justify-end>
        <v-tabs centered grow color="#1C2B32" dark slider-color="#E1E4E3">
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
		</v-layout>
	</v-container>
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
