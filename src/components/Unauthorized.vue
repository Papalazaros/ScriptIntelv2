<template>
  <v-container fill-height>
    <v-layout column justify-center align-center class="text-xs-center">
      <h1><b>HTTP Error 403 - Unauthorized</b></h1>
      <h2>Sorry, you do not have the authorization required to view this page.</h2>
      <v-btn class="return-button" to="/">Return to Home</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
export default {
}
</script>

<style scoped>
.return-button {
    background-color: #1C2B32!important;
    color: #E1E4E3!important;
    width: 750px;
    height: 100px;
}
</style>
