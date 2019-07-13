<template>
    <v-container fluid fill-height class="mt-2">
        <v-layout row align-center justify-center class="table-layout">
            <v-data-table :headers="headers" :items="scripts" item-key="scriptId" :rows-per-page-items="[10]" class="elevation-1">
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
        </v-layout>
    </v-container>
</template>

<script>
export default {
	computed: {
		scripts() {
            var self = this;
			return this.$store.getters.scripts.filter(script => script.numberOfRefills > 1 && script.numberOfRefillsRemaining > 0 && new Date(script.scriptWrittenDate) >= self.startDate);
		}
    },
  	props: {
		startDate: Date
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
			]
		}
    }
}
</script>

<style scoped>
.container .layout {
	margin: 0px 0px;
	padding: 0px 0px;
}
.subheading {
    color: black!important;
}
</style>
