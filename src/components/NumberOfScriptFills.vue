<script>
import moment from 'moment';
import { Line } from "vue-chartjs"

export default {
	extends: Line,
	mounted() {
		this.renderChart(this.datacollection, this.options)
	},
	props: {
		graphLabels: Object,
		scriptFillsInDateRange: Array
	},
	data () {
		return {
			options: {
				scales: {
					yAxes: [{
						ticks: {
							min: 0,
							fontSize: 18,
						}
					}],
					xAxes: [{
						ticks: {
							fontSize: 18
						}
					}]
				},
				legend: {
					display: true,
					labels: {
						fontSize: 18
					},
					position: "bottom"		
				},
				plugins: {
					filler: {
						propagate: true
					}
				},
				responsive: true,
				maintainAspectRatio: false
			}
		}
	},
	watch: {
		graphLabels: function () {
			this.renderChart(this.datacollection, this.options)
		}
	},
	methods: {
		getDataset() {
			var dataset = []
			var self = this;

			switch(this.graphLabels.type) {
				case "day":					
					this.graphLabels.labels.forEach(function(label) {
						dataset.push(self.scriptFillsInDateRange.filter(scriptFill => moment(scriptFill.fillDate).local().toDate().getHours() == label).length).reduce((a, b) => a + b.fillQuantity, 0)
					})
					break;
				case "week":
					this.graphLabels.labels.forEach(function(label) {
						dataset.push(self.scriptFillsInDateRange.filter(scriptFill => moment(scriptFill.fillDate).local().toDate().getDay() == label).reduce((a, b) => a + b.fillQuantity, 0))
					})
					break;
				case "month":
					this.graphLabels.labels.forEach(function(label) {
						dataset.push(self.scriptFillsInDateRange.filter(scriptFill => moment(scriptFill.fillDate).local().toDate().getDate() - 1 == label).reduce((a, b) => a + b.fillQuantity, 0))
					})
					break;
				case "year":
					this.graphLabels.labels.forEach(function(label) {
						dataset.push(self.scriptFillsInDateRange.filter(scriptFill => moment(scriptFill.fillDate).local().toDate().getMonth() == label).reduce((a, b) => a + b.fillQuantity, 0))
					})
					break;
			}
			return dataset;
		}
	},
	computed: {
		datacollection() {			
			var randomColor = require('randomcolor');
			var colorList = []
			var datasets = []
			var scriptIds = [...new Set(this.scriptFillsInDateRange.map(scriptFill => scriptFill.scriptId))]

			for (var i = 0; i < scriptIds.length; i++) {
				var accentColor = randomColor({luminosity: 'dark', format: 'rgba', alpha: 0.1})
				var color = accentColor.replace("0.1", "1.0")

				datasets.push({
					label: scriptIds[i],
					data: this.getDataset(),
					pointHoverBackgroundColor: color,
					pointBackgroundColor: color,
					borderColor: color,
					backgroundColor: accentColor,
					borderWidth: 2,
					pointRadius: 5
				});
			}

			return {labels: this.graphLabels.display, datasets: datasets}
		}
	}	
}
</script>

<style>
</style>
