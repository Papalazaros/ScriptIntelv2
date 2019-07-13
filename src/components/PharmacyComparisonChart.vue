<template>
  <v-container fluid grid-list-md class="mt-2">
	<v-data-iterator
	  :items="pharmacies"
	  content-tag="v-layout"
	  row
	  wrap
	  hide-actions
	>
	  <template v-slot:item="props">
		<v-flex xs12 md4 xl3>
		  <v-card>
			<v-card-title class="subheading font-weight-bold align-center text-xs-center justify-center">{{ props.item.pharmacyUniqueKey }}</v-card-title>
			<v-list dense>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Id:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.pharmacyId }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Name:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.pharmacyName }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Location:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.city + ", " + props.item.state }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			</v-list>
		  </v-card>
		</v-flex>
	  </template>
	</v-data-iterator>
	<br></br>
	<v-data-table
		:headers="headers"
		:items="pharmacies"
		class="elevation-1"
	>
	<template slot="headerCell" slot-scope="{ header }">
		<span class="subheading" v-text="header.text"/>
	</template>
	<template slot="items" slot-scope="{ item }">
	  <td class="text-xs-center">{{ item.pharmacyName }}</td>
	  <td class="text-xs-center">{{ item.totalFills }}</td>
	  <td class="text-xs-center">{{ item.grossProfit }}</td>
	</template>
  </v-data-table>
  </v-container>
</template>

<script>
import api from '@/api';


export default {
  	props: {
		selectedIds: Array
  	},
	computed: {
		pharmacies() {
			var self = this;
			return this.$store.getters.pharmacies.filter(pharmacy => self.selectedIds.includes(pharmacy.pharmacyId));
		}
	},
	data () {
		return {
			headers: [
				{ text: 'Pharmacy Name', value: 'pharmacyName', sortable: true, align: 'center' },
				{ text: 'Total Fills', value: 'totalFills', sortable: true, align: 'center' },
				{ text: 'Gross Profit', value: 'grossProfit', sortable: true, align: 'center' }
			],
		}
	}
}
</script>

<style scoped>
.container {
	padding: 0px 0px;
}
</style>
