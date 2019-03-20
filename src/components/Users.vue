<template>
<v-data-table class="elevation-1 table" :headers="headers" :items="users" item-key="userId" :hide-actions=true>
    <template slot="headerCell" slot-scope="{ header }">
        <span class="subheading" v-text="header.text"/>
    </template>
    <template slot="items" slot-scope="{ item }">
        <td class="text-xs-center">{{ item.userId }}</td>
        <td class="text-xs-center">{{ item.emailAddress }}</td>
        <td class="text-xs-center">{{ item.firstName }}</td>
        <td class="text-xs-center">{{ item.lastName }}</td>
        <td class="text-xs-center">{{ item.tenantId }}</td>
        <td class="text-xs-center actions">
        <v-btn color="info" :small=true @click.native="editItem(item)"><v-icon>edit</v-icon></v-btn>
        <v-btn color="error" :small=true @click.native="deleteItem(item)"><v-icon>delete</v-icon></v-btn>            
        </td>
    </template>
</v-data-table>
</template>

<script>
export default {
	async mounted() {
		this.$store.dispatch('updateUsers');
	},		
	data () {
		return {
			search: '',
			headers: [
				{ text: 'User Id', value: 'userId', sortable: true, align: 'center' },
                { text: 'Email Address', value: 'emailAddress', sortable: true, align: 'center' },
                { text: 'First Name', value: 'firstName', sortable: true, align: 'center' },
                { text: 'Last Name', value: 'lastName', sortable: true, align: 'center' },
                { text: 'Tenant Id', value: 'tenantId', sortable: true, align: 'center' },
                { text: "", value: "", sortable: false, align: "center" }
			],
		}
    },
    methods: {
		editItem(item) {			

		},
		deleteItem(item) {
			
		}        
    },
	computed: {
		users() {
			return this.$store.getters.users;
		}
	}
}
</script>

<style scoped>
.table .v-table{
    background-color: #FAFAF0!important;    
}
.subheading {
    color: #1C2B32!important;
}
.actions {
	padding: 0px 0px 0px 0px!important;
    width: 25px!important;
}
</style>
