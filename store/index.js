import Vuex from 'vuex'

const store = () => {
  return new Vuex.Store({
    state: {
      sidebar: false,
      nsfw: false,
      user: false,
      username: null,
      token: null
    },
    mutations: {
      toggleSidebar (state) {
        state.sidebar = !state.sidebar
      },
      toggleNsfw (state) {
        state.nsfw = !state.nsfw
      },
      username (state, username) {
        state.username = username
      },
      token (state, token) {
        state.token = token
      },
      user (state) {
        state.user = !state.user
      }
    }
  })
}

export default store
