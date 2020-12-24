import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        playerX: null,
        playerY: null,
        synced: false,
        mapName: null
    },
    mutations: {
        setPlayer(state, {x, y, mapName}) {
            state.synced = true;
            state.playerX = x;
            state.playerY = y;
            state.mapName = mapName;
        }
    },
    actions: {
    },
    plugins: [
        vuexLocal.plugin
    ]
});
