<template>
    <v-container fluid>
        <v-layout row justify-end>
          <v-tabs centered grow color="#1C2B32" dark slider-color="#E1E4E3">
            <template v-for="page in pages">
              <v-tab :key="page.name">{{page.name}}</v-tab>
              <v-tab-item :key="page.name">
                <v-card :is="page.component"></v-card>
              </v-tab-item>
            </template>
          </v-tabs>
        </v-layout>
    </v-container>  
</template>

<script>
import Analytics from './Analytics'
import ProfitLossAnalytics from './ProfitLossAnalytics'
import ActiveScripts from './ActiveScripts'

export default {
  components: {
    Analytics,
    ProfitLossAnalytics,
    ActiveScripts
  },
	data () {
		return {
      pages: [
        {name: 'Analytics', component: Analytics},
        {name: 'Profit/Loss Analytics', component: ProfitLossAnalytics},
        {name: 'Active Scripts', component: ActiveScripts},
        {name: 'Preferred Scripts', component: null}
      ]
    }
  }  
}
</script>
<style scoped>
.v-tabs {
    width: 100%;
}
.v-tabs__slider {
	height: 10px!important;
  color:red!important;
  background-color:red!important;
}
</style>
