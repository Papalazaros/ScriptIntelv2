<template>
	<v-container fluid>
		<v-layout row justify-center align-center class="text-xs-center graph-layout">
			<v-flex xs12 class="graph-sheet">
				<h2>% of Script Fills by Profit and Loss</h2>
				<ScriptFillsByProfit  :scriptFillsInDateRange="scriptFillsInDateRange" :graphLabels="graphLabels" style="position: relative; height:40vh; width:100%"/>
			</v-flex>
		</v-layout>
		<v-layout row xs12 justify-center class="graph-sheet text-xs-center mb-2">			
			<v-layout xs6 align-center column>
				<h2>Total Script Fills with Profit</h2>
				<v-spacer></v-spacer>
				<v-flex d-flex>
					<v-flex>
						<h3>%</h3>
						<v-btn flat small outline color="success">{{ scriptFillStatistics.scriptFillsWithProfitPercent }}</v-btn>
					</v-flex>
					<v-flex>
						<h3>#</h3>
						<v-btn flat small outline color="success">{{ scriptFillStatistics.scriptFillsWithProfitAmount }}</v-btn>
					</v-flex>
				</v-flex>
			</v-layout>
			<v-layout xs6 align-center column>
				<h2>% of Total Script Fills with Loss</h2>
				<v-spacer></v-spacer>
				<v-flex d-flex>
					<v-flex>
						<h3>%</h3>
						<v-btn flat small outline color="error">{{ scriptFillStatistics.scriptFillsWithLossPercent }}</v-btn>
					</v-flex>
					<v-flex>
						<h3>#</h3>
						<v-btn flat small outline color="error">{{ scriptFillStatistics.scriptFillsWithLossAmount }}</v-btn>
					</v-flex>
				</v-flex>
			</v-layout>			
		</v-layout>
		<v-layout row align-center justify-center>
			<v-flex xs6 class="mr-2 table-layout text-xs-center">
				<h2>Top 10 Drugs by Gross Profit</h2>
				<v-data-table :headers="drugProfitHeaders" :items="profitByDrug" item-key="drugName" hide-actions>
					<template slot="headerCell" slot-scope="{ header }">
						<span class="subheading" v-text="header.text"/>
					</template>
					<template slot="items" slot-scope="{ item }">
						<td class="text-xs-center">{{ item.drugName }}</td>
						<td class="text-xs-center">{{ item.profit }}</td>
						<td class="text-xs-center">{{ item.profitPerFill }}</td>
					</template>
				</v-data-table>
			</v-flex>
			<v-flex xs6 class="table-layout text-xs-center">
				<h2>Top 10 Prescribers by Gross Profit</h2>
				<v-data-table :headers="prescriberProfitHeaders" :items="profitByPrescriber" item-key="prescriberId" hide-actions>
					<template slot="headerCell" slot-scope="{ header }">
						<span class="subheading" v-text="header.text"/>
					</template>
					<template slot="items" slot-scope="{ item }">
						<td class="text-xs-center">{{ item.prescriberName }}</td>
						<td class="text-xs-center">{{ item.profit }}</td>
						<td class="text-xs-center">{{ item.profitPerFill }}</td>
					</template>
				</v-data-table>
			</v-flex>            
		</v-layout>		
	</v-container>
</template>

<script>
import ScriptFillsByProfit from './ScriptFillsByProfit'

export default {
	components: {
		ScriptFillsByProfit
	},
	props: {
		startDate: Date,
		graphLabels: Object,
		scriptFillsInDateRange: Array
	},
	computed: {
		profitByDrug() {
			var self = this;
			return this.$store.getters.profitByDrug;
		},
		profitByPrescriber() {
			var self = this;
			return this.$store.getters.profitByPrescriber;
		}
	},	
	data () {
		return {
			drugProfitHeaders: [
				{ text: 'Drug Name', value: 'drugName', sortable: true, align: 'center' },
				{ text: 'Profit', value: 'profit', sortable: true, align: 'center' },
				{ text: 'Profit Per Fill', value: 'profitPerFill', sortable: true, align: 'center' }
			],
			prescriberProfitHeaders: [
				{ text: 'Prescriber', value: 'prescriber', sortable: true, align: 'center' },
				{ text: 'Profit', value: 'profit', sortable: true, align: 'center' },
				{ text: 'Profit Per Fill', value: 'profitPerFill', sortable: true, align: 'center' }
			],
			mounted: false,
			scriptFillStatistics: {
				scriptFillsWithProfitAmount: 0,
				scriptFillsWithProfitPercent: 0,
				scriptFillsWithLossAmount: 0,
				scriptFillsWithLossPercent: 0
			}
		}
	},
	watch: {
		startDate: function () {
			this.getScriptFillStatistics();
		}
	},
	methods: {
		getScriptFillStatistics() {
			var self = this;

			if (this.scriptFillsInDateRange.length == 0) {
				this.scriptFillStatistics.scriptFillsWithProfitAmount = 0
				this.scriptFillStatistics.scriptFillsWithProfitPercent = 0
				this.scriptFillStatistics.scriptFillsWithLossAmount = 0
				this.scriptFillStatistics.scriptFillsWithLossPercent = 0
				return
			}

			this.scriptFillStatistics.scriptFillsWithProfitAmount = this.scriptFillsInDateRange.filter(scriptFill => scriptFill.profit > 0).length
			this.scriptFillStatistics.scriptFillsWithProfitPercent = (this.scriptFillStatistics.scriptFillsWithProfitAmount / this.scriptFillsInDateRange.length) * 100
			this.scriptFillStatistics.scriptFillsWithLossAmount = this.scriptFillsInDateRange.filter(scriptFill => scriptFill.profit < 0).length
			this.scriptFillStatistics.scriptFillsWithLossPercent = (this.scriptFillStatistics.scriptFillsWithLossAmount / this.scriptFillsInDateRange.length) * 100			
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
	border: 1px solid black;
}
.graph-layout {
	margin: 10px 0px!important;
}
.table-layout {
	border: 1px solid black;
}
.date-picker {
	margin: 10px 0px 0px 0px;
	border: 1px solid black;
}
</style>
