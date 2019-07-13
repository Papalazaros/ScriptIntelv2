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
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-model="fromDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="fromMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.fromMenu.save(fromDate);dispatchUpdate()">OK</v-btn>
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
                  readonly
                ></v-text-field>
              </template>
              <v-date-picker v-model="toDate" no-title scrollable>
                <v-spacer></v-spacer>
                <v-btn flat color="primary" @click="toMenu = false">Cancel</v-btn>
                <v-btn flat color="primary" @click="$refs.toMenu.save(toDate);dispatchUpdate()">OK</v-btn>
              </v-date-picker>
            </v-menu>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex xs12>
            <v-select
              v-model="selectedIds"
              :items="pharmacies"
              item-text="pharmacyUniqueKey"
              item-value="pharmacyId"
              label="Pharmacies"
              multiple
              chips
              hide-details
            ></v-select>
          </v-flex>
        </v-layout>
        <PharmacyComparisonChart :selectedIds="selectedIds"/>
    </v-container>
</template>

<script>
import PharmacyComparisonChart from './PharmacyComparisonChart'

export default {
	async mounted() {
		this.$store.dispatch('updatePharmacies', { fromDate: this.fromDate, toDate: this.toDate });
  },
	computed: {
		pharmacies() {
			return this.$store.getters.pharmacies;
		}
  },
	components: {
		PharmacyComparisonChart
  },
  methods: {
    dispatchUpdate() {
      this.$store.dispatch('updatePharmacies', { fromDate: this.fromDate, toDate: this.toDate });
    }
  },
	data () {
		return {
      fromMenu: false,
      toMenu: false,
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      selectedIds: []
    }
  }
}
</script>

<style scoped>
</style>
