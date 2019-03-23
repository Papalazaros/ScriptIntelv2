<template>
    <v-container fluid>
        <v-layout row justify-end>
          <v-tabs centered grow color="#1C2B32" dark slider-color="#E1E4E3">
            <v-tab ripple>Analytics</v-tab>
              <v-tab-item>
                <v-card flat><Analytics /></v-card>
              </v-tab-item>
            <v-tab ripple>Profit/Loss Analytics</v-tab>
              <v-tab-item>
                <v-card flat><ProfitLossAnalytics /></v-card>
              </v-tab-item>
            <v-tab ripple>Active Scripts</v-tab>
              <v-tab-item>
                <v-card flat><ActiveScripts /></v-card>
              </v-tab-item>
            <v-tab ripple >Preferred Scripts</v-tab>
              <v-tab-item>
                <v-card flat></v-card>
              </v-tab-item>
          </v-tabs>
        </v-layout>
    </v-container>
</template>

<script>
import Analytics from './Analytics'
import ActiveScripts from './ActiveScripts'
import ProfitLossAnalytics from './ProfitLossAnalytics'

export default {
  components: {
    Analytics,
    ActiveScripts,
    ProfitLossAnalytics
  }
}
</script>
<style scoped>
.v-tabs {
    width: 100%;
}
</style>
