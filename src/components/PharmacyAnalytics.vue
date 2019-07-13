<template>
    <v-container fluid>
        <v-layout row justify-end>
          <v-tabs centered grow color="#1C2B32" dark slider-color="#E1E4E3">
            <template v-for="page in pages">
              <v-tab :key="page.name">{{page.name}}</v-tab>
              <v-tab-item :key="page.name" :transition="false" :reverse-transition="false">
                <v-layout row align-center justify-center class="mt-2">
                  <v-btn-toggle v-model="selectedTimeframe" mandatory class="date-picker">
                    <v-btn flat>
                      Day
                    </v-btn>
                    <v-btn flat>
                      Week
                    </v-btn>
                    <v-btn flat>
                      Month
                    </v-btn>
                    <v-btn flat>
                      Year
                    </v-btn>
                  </v-btn-toggle>
                </v-layout>
                <v-card :is="page.component" :startDate="startDate"></v-card>
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
import moment from 'moment';

export default {
  async mounted() {
    this.$store.dispatch('updateScriptFills');
    this.$store.dispatch('updateScripts');
  },
  watch: {
    selectedTimeframe: function (val) {
      this.startDate = this.startDateFromSelectedTimeframe();
    }
  },
  components: {
    Analytics,
    ProfitLossAnalytics,
    ActiveScripts
  },
	data () {
		return {
      pages: [
        { name: 'Analytics', component: Analytics },
        { name: 'Profit/Loss Analytics', component: ProfitLossAnalytics },
        { name: 'Active Scripts', component: ActiveScripts },
        { name: 'Preferred Scripts', component: null }
      ],
      selectedTimeframe: 0,
      startDate: this.startDateFromSelectedTimeframe()
    }
  },
	methods: {
		startDateFromSelectedTimeframe() {
      var date = moment().utc();
			switch(this.selectedTimeframe) {
				case 0:
          date.subtract(1, 'd');
          break;
				case 1:
          date.subtract(7, 'd');
          break;
				case 2:
          date.subtract(30, 'd');
          break;
				case 3:
          date.subtract(365, 'd');								
          break;
				default:
          date.subtract(7, 'd');
          break;
      }
			return date.toDate();
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
