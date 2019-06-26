<template>
    <v-container fluid>
        <v-layout row>
          <v-flex xs6>
            <v-menu
              ref="fromMenu"
              v-model="fromMenu"
              :close-on-content-click="false"
              :return-value.sync="fromDate"
              transition="scale-transition"
              full-width
              min-width="250px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fromDate"
                  label="From Date"
                  prepend-icon="event"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="fromDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="fromMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.fromMenu.save(fromDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
          <v-flex xs6>
            <v-menu
              ref="toMenu"
              v-model="toMenu"
              :close-on-content-click="false"
              :return-value.sync="toDate"
              transition="scale-transition"
              full-width
              min-width="250px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="toDate"
                  label="To Date"
                  prepend-icon="event"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="toDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="toMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.toMenu.save(toDate)">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-combobox
              v-model="select"
              :items="items"
              label="Pharmacies"
              multiple
              chips
              dense
              hide-details
            >
              <template v-slot:selection="data">
                <v-chip
                  :key="JSON.stringify(data.item)"
                  :selected="data.selected"
                  :disabled="data.disabled"
                  class="v-chip--select-multi"
                  @input="data.parent.selectItem(data.item)"
                >
                  <v-avatar
                    class="accent white--text"
                    v-text="data.item.slice(0, 1).toUpperCase()"
                  ></v-avatar>
                  {{ data.item }}
                </v-chip>
              </template>
            </v-combobox>
          </v-flex>
        </v-layout>
      <PharmacyComparisonChart :pharmacyNames="items" />        
    </v-container>
</template>

<script>
import PharmacyComparisonChart from './PharmacyComparisonChart'

export default {
	components: {
		PharmacyComparisonChart
	},  
	data () {
		return {
      fromMenu: false,
      toMenu: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      select: [],
      items: [
        'Test Pharmacy 1',
        'Pharmacy 2',
        'Pharmacy 3',
        'Pharmacy 4'
      ]      
    }
  }  
}
</script>

<style scoped>
</style>
