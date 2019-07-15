import Vue from 'vue';
import axios from 'axios';
import { store } from './store';

const client = axios.create({
  baseURL: 'https://localhost:44371/api/',
  json: true
});

export default {
  async execute (method, resource, params, data) {
    let accessToken = await Vue.prototype.$auth.getAccessToken();    
    return client({
      method,
      url: resource,
      data,
      params,
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).then(req => {
      return req.data;
    }).catch(error => {
      var errorString = error.toString();
      if (!store.getters.errors.includes(errorString)) {
        store.commit('addError', errorString);
        setTimeout(() => store.commit('removeError'), 3500);
      }
      return [];
    });
  },
  getUsers () {
    return this.execute('get', '/Users');
  },
  getPharmacies (fromDate, toDate) {
    const params = {
      fromDate,
      toDate
    };
    return this.execute('get', '/Pharmacies', params);
  },
  getPharmaClasses () {
    return this.execute('get', '/PharmaClasses');
  },
  getScriptFills (pharmacyId) {
    return this.execute('get', '/ScriptFills', { pharmacyId });
  },
  getScripts (pharmacyId) {
    return this.execute('get', '/Scripts', { pharmacyId });
  },
  getPharmaciesForSelection () {
    return this.execute('get', '/Pharmacies/GetPharmaciesForSelection');
  },  
  getProfitByDrug (fromDate, pharmacyId) {
    const params = {
      fromDate,
      pharmacyId
    };
    return this.execute('get', '/Scripts/GetProfitByDrug', params);
  },  
  getProfitByPrescriber (fromDate, pharmacyId) {
    const params = {
      fromDate,
      pharmacyId
    };
    return this.execute('get', '/Scripts/GetProfitByPrescriber', params);
  },
  async createUser (data) {
    return this.execute('post', '/Users', data).then(() => store.dispatch('updateUsers'));
  },
  async deleteUser (id) {
    return this.execute('delete', '/Users/' + id).then(() => store.dispatch('updateUsers'));
  },
  async updateUser (id, data) {
    return this.execute('put', '/Users/' + id, data).then(() => store.dispatch('updateUsers'));
  },
};