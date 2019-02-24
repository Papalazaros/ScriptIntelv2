import Vue from 'vue';
import Vuex from 'vuex';
import api from '@/api';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        users: []
    },
    getters: {
        users(state) {
            return state.users;
        }
    },
    mutations: {
        setUsers (state, users) {
            Vue.set(state, 'users', users);
        }
    },
    actions : {
        async updateUsers(state) {
            var users = await api.getUsers();
            state.commit('setUsers', users);
        }
    }
});