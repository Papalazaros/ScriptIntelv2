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
              :items="pharmaClasses"
              item-text="pharmaClass"
              item-value="pharmacyClassId"
              label="Pharma Classes"
              hide-details
            ></v-combobox>            
          </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
	async mounted() {
		this.$store.dispatch('updatePharmaClasses');
  },
	computed: {
		pharmaClasses() {
			return this.$store.getters.pharmaClasses;
		}
  },  
	data () {
        return {
            fromMenu: false,
            toMenu: false,
            fromDate: new Date().toISOString().substr(0, 10),
            toDate: new Date().toISOString().substr(0, 10),
            select: []
        }
    }  
}
</script>

<style scoped>
</style>
