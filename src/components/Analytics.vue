<template>
	<v-container fluid>
		<v-layout row justify-end>
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
		<v-layout row justify-center align-center class="text-xs-center graph-layout">
			<v-flex xs6 class="graph-sheet">
				<h4># of Scripts Fills</h4>
				<v-sheet height="400" width="100%">
					<NumberOfScriptFills/>					
				</v-sheet>
			</v-flex>
			<v-flex xs6 class="graph-sheet">
				<h4>Gross Profit per Script Fill</h4>
				<v-sheet height="400" width="100%">
					<GrossProfitPerScriptFill/>					
				</v-sheet>
			</v-flex>
		</v-layout>
		<v-layout row align-center justify-center>
			<v-flex xs12>
				<v-sheet min-height="500" class="calendar-layout">
					<h2 class="text-xs-center">{{ currentMonth }}</h2>
					<v-calendar
						ref="calendar"
						type="month"
						color="red"
						v-model="now"
						:show-month-on-first=false
					>
					<template v-slot:day="{ present, past, date }">
						<v-layout align-center justify-space-around row>
							<v-flex class="text-xs-center">
								<u><v-icon>account_box</v-icon></u>
								<br></br>
								<h4>10</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<h4>x</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<u><v-icon>monetization_on</v-icon></u>
								<br></br>
								<h4>$15</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<h4>=</h4>
							</v-flex>							
							<v-flex class="text-xs-center">
								<h4>$150</h4>
							</v-flex>
							<v-flex class="text-xs-center">
								<v-icon color="red">keyboard_arrow_up</v-icon>
							</v-flex>							
						</v-layout>
					</template>
					</v-calendar>
					<v-flex class="text-xs-center">
						<v-btn class="my-3" @click="$refs.calendar.prev()">
							<v-icon dark left>
								keyboard_arrow_left
							</v-icon>
							Prev
						</v-btn>
						<v-btn class="my-3" @click="$refs.calendar.next()">
							Next
							<v-icon right dark>
								keyboard_arrow_right
							</v-icon>
						</v-btn>
						<v-spacer></v-spacer>
						<h3><v-icon class="mx-2">info</v-icon>Total Fill Count</h3>
						<h3><v-icon class="mx-2">info</v-icon>Total Gross Profit</h3>
						<h3><v-icon class="mx-2">info</v-icon>Average Profit Per Script Fill</h3>			
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
	data () {
		return {
			selectedTimeframe: null,
			now: null
		}
	},
	computed: {
		currentMonth() {			
			if (this.now == null) {
				return moment(this.start).format('MMMM');
			}
			return moment(this.now).format('MMMM');
		}
	}
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
	border: 1px solid #1C2B32;
	padding: 5px 5px;
}
.calendar-layout {
	border: 1px solid #1C2B32;
	padding: 5px 5px;
}
.graph-layout {
	padding: 10px 0px!important;
}
.date-picker {
	margin: 10px 0px 0px 0px;
}
</style>
