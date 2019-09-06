const state = {
  data: {}
}

const mutations = {
  SAVE_RENT (state, rent) {
    state.data = Object.assign({}, state.data, rent)
  }
}

export default {
  state,
  mutations
}