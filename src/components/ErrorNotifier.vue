<template>
    <v-layout fill-height column ma-0>
      <v-spacer></v-spacer>
      <v-flex class="text-xs-center" shrink>
		<transition-group name="fade" tag="div">
			<div class="error" v-for="(error, index) in errors" :key="index">
				<v-alert :value="true" type="error">
				{{error}}
				</v-alert>
			</div>
		</transition-group>
      </v-flex>
    </v-layout>
</template>

<script>
	import { mapGetters } from "vuex"

	export default {
		name: "errorNotifier",
		computed: {
			...mapGetters([ "errors" ])
		}
	}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.error {
	font-size: 18px;
	margin: 25px 25px;
	border: 0px;
}
</style>