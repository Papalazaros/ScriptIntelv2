<template>
	<v-container fluid>
		<v-layout row justify-center align-center class="text-xs-center graph-layout">
			<v-flex xs6 class="graph-sheet mr-2">
				<h2># of Scripts Fills</h2>
				<v-sheet>
					<NumberOfScriptFills style="position: relative; height:40vh; width:100%"/>
				</v-sheet>
			</v-flex>
			<v-flex xs6 class="graph-sheet">
				<h2>Gross Profit per Script Fill</h2>
				<v-sheet>
					<GrossProfitPerScriptFill style="position: relative; height:40vh; width:100%"/>					
				</v-sheet>
			</v-flex>
		</v-layout>
		<v-layout row align-center justify-center>
			<v-flex xs12>
				<v-sheet class="calendar-layout">
					<v-layout row align-center justify-center class="text-xs-center">
						<v-btn small flat @click="$refs.calendar.prev()">
							<v-icon>
								keyboard_arrow_left
							</v-icon>
						</v-btn>
						<h2 class="calender-month text-xs-center">{{ currentMonth }}</h2>
						<v-btn small flat @click="$refs.calendar.next()">
							<v-icon>
								keyboard_arrow_right
							</v-icon>
						</v-btn>
					</v-layout>
					<v-calendar
						ref="calendar"
						type="month"
						color="red"
						v-model="now"
						:show-month-on-first=false
					>
					<template v-slot:day="{ present, past, date }">
						<v-layout row align-center>
							<v-flex class="text-xs-center">
								<v-icon small color="black">account_box</v-icon>
								<br>
								<h4>10</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<h4>x</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<v-icon small color="success">monetization_on</v-icon>
								<br>
								<h4>$15</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<h4>=</h4>
							</v-flex>							
							<v-flex class="text-xs-center">
								<h4>$150</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<v-icon color="red">keyboard_arrow_down</v-icon>
							</v-flex>							
						</v-layout>
					</template>
					</v-calendar>
					<v-flex class="text-xs-center mt-2">						
						<h3>Total Fill Count:<span class="ml-1">{{ scriptFillsInDateRange.length }}</span></h3>
						<h3>Total Gross Profit:<span class="ml-1">$500</span></h3>
						<h3>Average Profit Per Script Fill:<span class="ml-1">$10</span></h3>
					</v-flex>
				</v-sheet>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import moment from 'moment';
import GrossProfitPerScriptFill from './GrossProfitPerScriptFill'
import NumberOfScriptFills from './NumberOfScriptFills'

export default {
	components: {
		GrossProfitPerScriptFill,
		NumberOfScriptFills
	},
  	props: {
		startDate: Date
  	},
	data () {
		return {
			now: null
		}
	},
	computed: {
		currentMonth() {			
			if (this.now == null) {
				return moment(this.start).format('MMMM');
			}
			return moment(this.now).format('MMMM');
		},
		scriptFills() {
			return this.$store.getters.scriptFills;
		},
		scriptFillsInDateRange() {
			var self = this;
			return this.$store.getters.scriptFills.filter(scriptFill => new Date(scriptFill.fillDate) >= self.startDate)
		}
	},
}
</script>

<style scoped>
.container {
	padding: 0px 0px;
}
.container .layout {
	margin: 0px 0px;
	padding: 0px 0px;
}
.graph-sheet {
	border: 1px solid black;
}
.calendar-layout {
	border: 1px solid black;
	padding: 0px 5px;
}
.graph-layout {
	padding: 10px 0px!important;
}
.date-picker {
	margin: 10px 0px 0px 0px;
	border: 1px solid black;
}
.calender-month {
	width: 100px;
}
</style>
