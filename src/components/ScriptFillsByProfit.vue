<script>
import { Bar } from "vue-chartjs"

export default {
	extends: Bar,
	mounted() {
        console.log("fillsbyprofitmounted")
		this.renderChart(this.datacollection, this.options)
    },
    methods: {
        render() {
            console.log('rerender')
            this.renderChart(this.datacollection, this.options)
        }
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
	computed: {
		datacollection() {
			var labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"]
			var datasets = []
			var randomColor = require('randomcolor');
			var colorList = []
			var scriptCount = 2

			for (var i = 0; i < scriptCount; i++) {
				var accentColor = randomColor({luminosity: 'dark', format: 'rgba', alpha: 0.1})
				var color = accentColor.replace("0.1", "1.0")
				colorList.push(color)
				colorList.push(accentColor)				
			}

			datasets.push({
				label: "Script 1",
				data: [0, 1, 2, 3, 1, 2, 6, 12, 8, 5, 3, 11],
				pointHoverBackgroundColor: colorList[0],
				pointBackgroundColor: colorList[0],
				borderColor: colorList[0],
				backgroundColor: colorList[1],
				borderWidth: 2,
				pointRadius: 5,
			})

			datasets.push({
				label: "Script 2",
				data: [0, 3, 5, 3, 7, 5, 6, 7, 12, 9, 10, 11],
				pointHoverBackgroundColor: colorList[2],
				pointBackgroundColor: colorList[2],
				borderColor: colorList[2],
				backgroundColor: colorList[3],
				borderWidth: 2,
				pointRadius: 5,
			})

			datasets.push({
				label: "Script 1",
				data: [0, 20, 15, 13, 17, 15, 6, 7, 12, 19, 10, 11],
				pointHoverBackgroundColor: colorList[0],
				pointBackgroundColor: colorList[0],
				borderColor: colorList[0],
				backgroundColor: colorList[1],
				borderWidth: 2,
				pointRadius: 5,
				type: 'line'
			})

			datasets.push({
				label: "Script 2",
				data: [0, 10, 20, 23, 11, 12, 26, 12, 18, 15, 23, 11],
				pointHoverBackgroundColor: colorList[2],
				pointBackgroundColor: colorList[2],
				borderColor: colorList[2],
				backgroundColor: colorList[3],
				borderWidth: 2,
				pointRadius: 5,
				type: 'line'
			})

			return {labels: labels, datasets: datasets}
		}
	}
}
</script>

<style>
</style>
