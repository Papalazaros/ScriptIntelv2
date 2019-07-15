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
        scripts: [],
        profitByPrescriber: [],
        profitByDrug: [],
        pharmaciesForSelection: []
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
        },
        profitByPrescriber(state) {
            return state.profitByPrescriber;
        },
        profitByDrug(state) {
            return state.profitByDrug;
        },
        pharmaciesForSelection(state) {
            return state.pharmaciesForSelection;
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
        setProfitByPrescriber (state, profitByPrescriber) {
            Vue.set(state, 'profitByPrescriber', profitByPrescriber);
        },
        setProfitByDrug (state, profitByDrug) {
            Vue.set(state, 'profitByDrug', profitByDrug);
        },
        setPharmaciesForSelection (state, pharmaciesForSelection) {
            Vue.set(state, 'pharmaciesForSelection', pharmaciesForSelection);
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
        async updateScriptFills(state, pharmacyId) {
            var scriptFills = await api.getScriptFills(pharmacyId);
            state.commit('setScriptFills', scriptFills);
        },
        async updateScripts(state, pharmacyId) {
            var scripts = await api.getScripts(pharmacyId);
            state.commit('setScripts', scripts);
        },
        async updateProfitByPrescriber(state, data) {
            var profitByPrescriber = await api.getProfitByPrescriber(data.fromDate, data.pharmacyId);
            state.commit('setProfitByPrescriber', profitByPrescriber);
        },
        async updateProfitByDrug(state, data) {
            var profitByDrug = await api.getProfitByDrug(data.fromDate, data.pharmacyId);
            state.commit('setProfitByDrug', profitByDrug);
        },
        async updatePharmaciesForSelection(state) {
            var pharmaciesForSelection = await api.getPharmaciesForSelection();
            state.commit('setPharmaciesForSelection', pharmaciesForSelection);
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