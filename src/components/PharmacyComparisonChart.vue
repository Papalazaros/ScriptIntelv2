<template>
  <v-container fluid grid-list-md>
	<v-data-iterator
	  :items="items"
	  content-tag="v-layout"
	  row
	  wrap
	  hide-actions
	>
	  <template v-slot:header>
		<v-toolbar color="indigo" flat/>
	  </template>
	  <template v-slot:item="props">
		<v-flex xs3>
		  <v-card>
			<v-card-title class="subheading font-weight-bold align-center text-xs-center justify-center">{{ props.item.name }}</v-card-title>
			<v-list dense>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Calories:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.calories }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Fat:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.fat }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Carbs:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.carbs }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			  <v-list-tile>
				<v-flex xs6>
					<v-list-tile-content class="align-center"><b>Protein:</b></v-list-tile-content>
				</v-flex>
				<v-flex xs6>
					<v-list-tile-content class="align-center">{{ props.item.protein }}</v-list-tile-content>
				</v-flex>
			  </v-list-tile>
			</v-list>
		  </v-card>
		</v-flex>
	  </template>
	</v-data-iterator>
  </v-container>
</template>

<script>

export default {
  	props: {
    	pharmacyNames: Array
  	},
	data () {
		return {
			items: [
				{
					name: 'Pharmacy 1',
					calories: 159,
					fat: 6.0,
					carbs: 24,
					protein: 4.0,
					sodium: 87,
					calcium: '14%',
					iron: '1%'
				},
				{
					name: 'Pharmacy 2',
					calories: 237,
					fat: 9.0,
					carbs: 37,
					protein: 4.3,
					sodium: 129,
					calcium: '8%',
					iron: '1%'
				},
				{
					name: 'Pharmacy 3',
					calories: 262,
					fat: 16.0,
					carbs: 23,
					protein: 6.0,
					sodium: 337,
					calcium: '6%',
					iron: '7%'
				},
				{
					name: this.pharmacyNames[0],
					calories: 305,
					fat: 3.7,
					carbs: 67,
					protein: 4.3,
					sodium: 413,
					calcium: '3%',
					iron: '8%'
				}
			]
		}
	}
}
</script>

<style scoped>
.container {
	padding: 0px 0px;
}
</style>
