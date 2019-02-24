<template>
  <div>
      <p><b>HTTP Error 403 - Unauthorized</b></p>
      <p>Sorry, you do not have the authorization required to view this page.</p>
      <br>
      <br>
      <br>
      <v-btn class="return-button" to="/">Return to Home</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Unauthorized'
}
</script>

<style scoped>
div {
    text-align: center;
    font-size: 50px;
}
.return-button {
    background-color: #1C2B32!important;
    color: #E1E4E3!important;
    width: 750px;
    height: 100px;
}
</style>
