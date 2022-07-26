import { defineStore } from 'pinia'

export const userStore = defineStore('userStore', {

  state: () => ({
    user: {
      id: "noid",
      nome: "sem nome",
      urlFoto: "https://cdn.quasar.dev/img/boy-avatar.png"
    }
  }),
  actions: {
    setUser(user) {
      // muda o estado
      this.user = user
    },
    userAdmin() {
      let lista = ["18374109840", "28854077860", "99271176804", "12345678900", "36126741889"]
      if (lista.lastIndexOf(this.user.cpf) != -1) {
        return true
      }
      return false
    }
  },
})
