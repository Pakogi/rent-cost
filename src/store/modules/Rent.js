import { getRents } from "../../utils/RentModel";

const state = {
  data: {}
}

const mutations = {
  SAVE_RENT (state, rent) {
    state.data = Object.assign({}, state.data, rent)
  }
}

const actions = {
  FETCH_RENTS ({ commit }) {
    getRents().then(querySnapshot => {
      let rents = querySnapshot.docs.map((rent) => {
        return rent.data()
      })

      commit('SAVE_RENT', rents)
    })
  }
}

export default {
  state,
  mutations,
  actions
}