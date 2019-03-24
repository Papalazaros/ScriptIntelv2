<template>
	<v-container fluid>
		<v-layout row align-center justify-center>
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
			<v-flex xs12 class="graph-sheet">
				<h2>% of Script Fills by Profit and Loss</h2>
				<ScriptFillsByProfit  style="position: relative; height:40vh; width:100%"/>
			</v-flex>
		</v-layout>
		<v-layout row xs12 justify-center class="graph-sheet text-xs-center mb-2">
			<v-flex xs6>
				<h2>% of Total Script Fills with Profit</h2>
				<v-btn flat small outline color="success">1</v-btn>                    
			</v-flex>
			<v-flex xs6>
				<h2>% of Total Script Fills with Loss</h2>
				<v-btn flat small outline color="error">1</v-btn>                    
			</v-flex>
		</v-layout>
        <v-layout row align-center justify-center>
            <v-flex xs6 class="mr-2 table-layout text-xs-center">
                <h2>Top 10 Drugs by Gross Profit</h2>
                <v-data-table :headers="drugProfitHeaders" :items="items" item-key="drugName" hide-actions>
                    <template slot="headerCell" slot-scope="{ header }">
                        <span class="subheading" v-text="header.text"/>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                        <td class="text-xs-center">{{ item.drugName }}</td>
                        <td class="text-xs-center">{{ item.profit }}</td>
                        <td class="text-xs-center">{{ item.n }}</td>
                        <td class="text-xs-center">{{ item.profitPerFill }}</td>
                    </template>
                </v-data-table>
            </v-flex>
            <v-flex xs6 class="table-layout text-xs-center">
                <h2>Top 10 Prescribers by Gross Profit</h2>
                <v-data-table :headers="prescriberProfitHeaders" :items="items" item-key="prescriber" hide-actions>
                    <template slot="headerCell" slot-scope="{ header }">
                        <span class="subheading" v-text="header.text"/>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                        <td class="text-xs-center">{{ item.prescriber }}</td>
                        <td class="text-xs-center">{{ item.profit }}</td>
                        <td class="text-xs-center">{{ item.n }}</td>
                        <td class="text-xs-center">{{ item.profitPerFill }}</td>
                    </template>
                </v-data-table>          
            </v-flex>            
        </v-layout>		
	</v-container>
</template>

<script>
import moment from 'moment';
import ScriptFillsByProfit from './ScriptFillsByProfit'

export default {
	components: {
		ScriptFillsByProfit
	},
	data () {
		return {
			selectedTimeframe: null,
			now: null,
			drugProfitHeaders: [
                { text: 'Drug Name', value: 'drugName', sortable: true, align: 'center' },
                { text: 'Profit', value: 'profit', sortable: true, align: 'center' },
                { text: 'N', value: 'n', sortable: true, align: 'center' },
                { text: 'Profit Per Fill', value: 'profitPerFill', sortable: true, align: 'center' }
			],
			prescriberProfitHeaders: [
                { text: 'Prescriber', value: 'prescriber', sortable: true, align: 'center' },
                { text: 'Profit', value: 'profit', sortable: true, align: 'center' },
                { text: 'N', value: 'n', sortable: true, align: 'center' },
                { text: 'Profit Per Fill', value: 'profitPerFill', sortable: true, align: 'center' }
			],
			items: [],
			mounted: false
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
	border: 1px solid black;
	padding: 10px 10px;
}
.calendar-layout {
	border: 1px solid black;
	padding: 5px 5px;
}
.graph-layout {
	padding: 10px 0px!important;
}
.table-layout {
	border: 1px solid black;
    padding: 5px 5px!important;
}
.date-picker {
	margin: 10px 0px 0px 0px;
	border: 1px solid black;
}
</style>
