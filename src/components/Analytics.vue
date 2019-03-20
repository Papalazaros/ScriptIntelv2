<template>
	<v-container fluid>
		<v-layout row justify-end>
			<v-btn-toggle v-model="selectedTimeframe" mandatory class="date-picker-parent">
				<v-btn flat class="date-picker">
					Day
				</v-btn>
				<v-btn flat class="date-picker">
					Week
				</v-btn>
				<v-btn flat class="date-picker">
					Month
				</v-btn>
				<v-btn flat class="date-picker">
					Year
				</v-btn>
			</v-btn-toggle>
		</v-layout>	
		<v-layout row align-center justify-center>
			<v-flex xs12>
				<v-sheet height="500" min-height="500">
					<h1 class="text-xs-center">{{ currentMonth }}</h1>
					<v-calendar
						ref="calendar"
						type="month"
						color="primary"
						v-model="now"
						:show-month-on-first=false
						hide-header
					>
					<template v-slot:day="{ present, past, date }">
						<v-layout fill-height justify-center align-start>
							<v-icon>local_pharmacy</v-icon>
							<v-icon>monetization_on</v-icon>
							<v-icon>attach_money</v-icon>
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

export default {
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
	padding: 0px 5px;
}
.container .layout {
	margin: 10px 0px;
	padding: 0px 0px;
}
</style>
