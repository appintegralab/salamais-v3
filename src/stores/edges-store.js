import { defineStore } from 'pinia'

export const edgeStore = defineStore('edgeStore',{

  state: () => ({
    edges: {},
    len: 0,
    changed: 0,
    ucSel: { id: "" },
    metaSel: { id: "" }
  }),
  actions: {
    add(idFrom, idTo) {
      let edgeID = idFrom+"&"+idTo
      this.edges[edgeID] = {
        id: edgeID,
        idFrom,
        idTo
      }
      this.len++
      this.changed++
    },
  },
})
