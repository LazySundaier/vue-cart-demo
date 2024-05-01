import axios from 'axios'

export default {
  namespaced: true,
  state () {
    return {
      list: []
    }
  },
  mutations: {
    updataList (state, newList) {
      state.list = newList
    },
    updateCount (state, obj) {
      const goods = state.list.find(item => item.id === obj.id)
      goods.count = obj.newCount
    }
  },
  actions: {
    async getList (context) {
      const res = await axios.get('http://localhost:3000/cart')
      // console.log(res)
      context.commit('updataList', res.data)
    },
    async updataCountAsync (context, obj) {
      const res = await axios.patch(`http://localhost:3000/cart/${obj.id}`, { count: obj.newCount })
      console.log(res)
      context.commit('updateCount', {
        id: obj.id,
        newCount: obj.newCount
      })
    }
  },
  getters: {
    totalCount (state) {
      return state.list.reduce((sum, item) => sum + item.count, 0)
    },
    totalPrice (state) {
      return state.list.reduce((sum, item) => sum + item.count * item.price, 0)
    }
  }
}
