import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: [],
        pharmacies: [],
        errors: [],
        pharmaClasses: [],
        scriptFills: [],
        scripts: []
    },
    getters: {
        users(state) {
            return state.users;
        },
        pharmacies(state) {
            return state.pharmacies;
        },
        pharmaClasses(state) {
            return state.pharmaClasses;
        },        
        errors(state) {
            return state.errors;
        },
        scriptFills(state) {
            return state.scriptFills;
        },
        scripts(state) {
            return state.scripts;
        }        
    },
    mutations: {
        setUsers (state, users) {
            Vue.set(state, 'users', users);
        },
        setPharmacies (state, pharmacies) {
            Vue.set(state, 'pharmacies', pharmacies);
        },
        setPharmaClasses (state, pharmaClasses) {
            Vue.set(state, 'pharmaClasses', pharmaClasses);
        },
        setScriptFills (state, scriptFills) {
            Vue.set(state, 'scriptFills', scriptFills);
        },
        setScripts (state, scripts) {
            Vue.set(state, 'scripts', scripts);
        },
        addError (state, error) {
            state.errors.unshift(error);
        },
        removeError (state) {
            state.errors.pop();
        }
    },
    actions : {
        async updateUsers(state) {
            var users = await api.getUsers();
            state.commit('setUsers', users);
        },
        async updatePharmaClasses(state) {
            var pharmaClasses = await api.getPharmaClasses();
            state.commit('setPharmaClasses', pharmaClasses);
        },
        async updateScriptFills(state) {
            var scriptFills = await api.getScriptFills();
            state.commit('setScriptFills', scriptFills);
        },
        async updateScripts(state) {
            var scripts = await api.getScripts();
            state.commit('setScripts', scripts);
        },        
        async updatePharmacies(state, data) {
            var pharmacies = null;

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