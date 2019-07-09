import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [],
        pharmacies: [],
        pharmacyDetails: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        pharmacies(state) {
            return state.pharmacies;
        },
        pharmacyDetails(state) {
            return state.pharmacyDetails;
        }        
    },
    mutations: {
        setUsers (state, users) {
            Vue.set(state, 'users', users);
        },
        setPharmacies (state, pharmacies) {
            Vue.set(state, 'pharmacies', pharmacies);
        },
        setPharmacyDetails (state, pharmacyDetails) {
            Vue.set(state, 'pharmacyDetails', pharmacyDetails);
        }        
    },
    actions : {
        async updateUsers(state) {
            var users = await api.getUsers();
            state.commit('setUsers', users);
        },
        async updatePharmacies(state) {
            var pharmacies = await api.getPharmacies();
            state.commit('setPharmacies', pharmacies);
        },
        async updatePharmacyDetails(state, data) {
            var pharmacyDetails = await api.getPharmacyDetails(data.selectedIds, data.fromDate, data.toDate);
            state.commit('setPharmacyDetails', pharmacyDetails);
        }
    }
});