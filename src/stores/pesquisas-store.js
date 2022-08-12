import { defineStore } from 'pinia'
import { rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue } from "firebase/database"

export const pesquisasStore = defineStore('pesquisasStore', {

  state: () => ({
    pesquisas: {},
    porFormacao: {},
    qtdeTotal: 0,
    qtdePorFormacao: {}
  }),
  actions: {
    
    init(cbfunc) {
      // muda o estado
      let self = this
      onValue(rdbref("/pesquisas/quest01"),(snap) => {
        self.pesquisas = snap.val()
        self.classification()
        cbfunc()
      })
    },

    classification() {
      this.porFormacao = {}
      this.qtdePorFormacao = {}
      for(let key in this.pesquisas) {
        let [salaID, formacaoID, encontroID, areaID] = key.split(":")
        if(this.porFormacao[formacaoID] == undefined) {
          this.porFormacao[formacaoID] = {}
        }
        this.porFormacao[formacaoID][key] = this.pesquisas[key]

        if(this.qtdePorFormacao[formacaoID] == undefined) {
          this.qtdePorFormacao[formacaoID] = 0
        }
        let qtde = Object.keys(this.pesquisas[key]).length
        this.qtdePorFormacao[formacaoID] = this.qtdePorFormacao[formacaoID] + qtde
      }
      console.log("pesquisasStore",this);
    }
  },
})
