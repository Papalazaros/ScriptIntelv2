<template>
    <v-container fluid>
        <v-layout justify-start>
            <h2>Active Scripts</h2>
        </v-layout>
        <v-layout row align-center justify-center class="table-layout">
            <v-flex xs12>
                <v-data-table :headers="headers" :items="items" item-key="userId" hide-actions>
                    <template slot="headerCell" slot-scope="{ header }">
                        <span class="subheading" v-text="header.text"/>
                    </template>
                    <template slot="items" slot-scope="{ item }">
                        <td class="text-xs-center">{{ item.scriptNumber }}</td>
                        <td class="text-xs-center">{{ item.drugName }}</td>
                        <td class="text-xs-center">{{ item.ndc }}</td>
                        <td class="text-xs-center">{{ item.substance }}</td>
                        <td class="text-xs-center">{{ item.status }}</td>
                        <td class="text-xs-center">{{ item.prescriber }}</td>
                        <td class="text-xs-center">{{ item.dateWritten }}</td>
                        <td class="text-xs-center">{{ item.numberOfRefills }}</td>
                        <td class="text-xs-center">{{ item.numberOfRefillsRemaining }}</td>
                        <td class="text-xs-center">{{ item.numberOfFills }}</td>
                        <td class="text-xs-center">{{ item.totalProfit }}</td>
                    </template>
                </v-data-table>          
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
	async mounted() {
	},		
	data () {
		return {
			search: '',
			headers: [
				{ text: 'Script Number', value: 'scriptNumber', sortable: true, align: 'center' },
                { text: 'Drug Name', value: 'drugName', sortable: true, align: 'center' },
                { text: 'NDC', value: 'ndc', sortable: true, align: 'center' },
                { text: 'Substance', value: 'substance', sortable: true, align: 'center' },
                { text: 'Status', value: 'status', sortable: true, align: 'center' },
                { text: 'Prescriber', value: 'prescriber', sortable: true, align: 'center' },
                { text: 'Date Written', value: 'dateWritten', sortable: true, align: 'center' },
                { text: '# of Refills', value: 'numberOfRefills', sortable: true, align: 'center' },
                { text: '# of Refills Remaining', value: 'numberOfRefillsRemaining', sortable: true, align: 'center' },
                { text: '# of Fills', value: 'numberOfFills', sortable: true, align: 'center' },
                { text: 'Total Profit', value: 'totalProfit', sortable: true, align: 'center' }
			],
            items: []
		}
    },
    methods: {
		editItem(item) {			
            console.log(item);
		},
		deleteItem(item) {
			console.log(item);
		}        
    }
}
</script>

<style scoped>
.subheading {
    color: #1C2B32!important;
}
.actions {
	padding: 0px 0px 0px 0px!important;
    width: 25px!important;
}
.container {
  background-color: b!important;
}
.table-layout {
	border: 1px solid #1C2B32;
    padding: 5px 5px!important;
}
</style>
