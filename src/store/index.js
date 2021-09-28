import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const url = 'https://api.spacexdata.com/v3/launches'

const LIMIT = 5

export default new Vuex.Store({
    state: {
        launch: 'launches 3',
        launches: [],
        isLoading: false,
        isFinish: false
    },
    mutations: {
        setLaunches(state, payload) {
            state.launches = payload
        },
        setIsLoading(state, bool) {
            state.isLoading = bool
        },
        setIsFinish(state, bool) {
            state.isFinish = bool
        }

    },
    actions: {
        async fetchFiltered(state, search) {
            state.commit('setIsLoading', true)

            await axios.get(url, {
                params: {
                    rocket_name: search,
                }
            }).then(res => {
                state.commit('setIsFinish', false)
                if (res.data.length > 0) {
                    state.commit('setLaunches', res.data)
                } else {
                    state.commit('setIsFinish', true)
                    state.commit('setIsLoading', false)
                }

            });
        },
        async fetchLaunches(state, offset) {

            state.commit('setIsLoading', true)

            await axios.get(url, {
                params: {
                    limit: LIMIT,
                    offset: offset
                }
            }).then(res => {
                state.commit('setIsFinish', false)
                if (res.data.length > 0) {
                    state.commit('setLaunches', res.data)
                } else {
                    state.commit('setIsFinish', true)
                    state.commit('setIsLoading', false)
                }

            });

        }
    },
    getters: {
        getLaunches: state => state.launches,
        getLaunch: state => state.launch,
        getIsLoading: state => state.isLoading,
        getIsFinish: state => state.isFinish,
    }
})