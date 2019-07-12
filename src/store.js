import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [],
        pharmacies: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        pharmacies(state) {
            return state.pharmacies;
        }
    },
    mutations: {
        setUsers (state, users) {
            Vue.set(state, 'users', users);
        },
        setPharmacies (state, pharmacies) {
            Vue.set(state, 'pharmacies', pharmacies);
        }
    },
    actions : {
        async updateUsers(state) {
            var users = await api.getUsers();
            state.commit('setUsers', users);
        },
        async updatePharmacies(state, data) {
            var pharmaices = null;
            if (data) {
                pharmacies = await api.getPharmacies(data.fromDate, data.toDate);
            }
            else {
                pharmacies = await api.getPharmacies();
            }
            
            state.commit('setPharmacies', pharmacies);
        }
    }
});