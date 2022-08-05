import { defineStore } from 'pinia'
import { rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"

export const allUserStore = defineStore('allUserStore', {

  state: () => ({
    users: {}
  }),
  actions: {
    init() {
      // muda o estado
      let self = this
      onValue(rdbref("usuarios"),(snap) => {
        self.users = snap.val()
      })
    },
    getUser(id) {
      return this.users[id]
    }
  },
})
