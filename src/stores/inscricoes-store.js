import { defineStore } from 'pinia'

export const inscStore = defineStore('inscStore', {

  state: () => ({
    formacoes: {}
  }),
  actions: {
    setUser(user) {
      // muda o estado
      this.user = user
    }
  },
})
