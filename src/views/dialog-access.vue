<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-toolbar class="h-[80px]">
        <q-avatar size="64px">
          <img src="../assets/salamais-quadrado.png">
        </q-avatar>
        <q-toolbar-title><span class="text-weight-bold">Sala Mais</span> Acesso</q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <div>
        <div class="mx-4 mt-1 mb-4 border p-2 rounded shadow bg-violet-100">
          <p class="finter fw-300 text-[9pt] m-0">
            Digite seu CPF para acessar as formações do Sala Mais
          </p>
        </div>
        <div class="mx-4 mb-2">
          <q-input dense outlined v-model="cpf" label="Digite seu CPF" mask="###.###.###-##" />
        </div>
        <div class="flex justify-center mb-2">
          <button @click="login"
            class="flex items-center text-sm border py-1 px-4 rounded bg-cyan-900 hover:bg-cyan-800 text-white fw-300">
            <span class="iconify mr-2" data-icon="ic:outline-login" data-inline="false"></span>
            Acessar
          </button>
        </div>
        <div class="border-t mb-2"></div>
        <div class="flex justify-center" v-if="cpfNotFound">
          <div class="w-[300px] text-xs bg-gray-200 border rounded shadow mb-1 p-1 text-center">
            Caso você ainda não tenha realizado o cadastro, clique no botão abaixo.
          </div>
        </div>
        <div class="flex justify-center mb-2">
          <button @click="showCadastro"
            class="border rounded flex items-center text-sm py-0 px-4 text-gray-700 hover:text-cyan-900 hover:bg-gray-200 fw-300">
            <span class="iconify mr-1" data-icon="ic:twotone-assignment-ind" data-inline="false"></span>
            <span class="text-[8pt] pt-1">Cadastrar dados de acesso</span>
          </button>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import notif from "../notif.js"
import { userStore } from "../stores/user-store.js"

export default {
  data() {
    return {
      dialog: false,
      cpf: "",
      cpfNotFound: false, 
      userStore: userStore(),
    }
  },
  methods: {
    show() {
      this.cpf = ""
      this.dialog = true
    },

    login() {
      let self = this
      let cpf = this.cpf.trim().replaceAll('.', '').replaceAll('-', '')
      console.log("login", cpf);
      if (cpf == "") {
        this.$q.notify(notif.error("CPF não encontrado ou inválido!"))
        return
      }
      console.log("cpf", cpf);
      let queryref = query(ref(rdb, "/salamais/usuarios/"), orderByChild('cpf'), equalTo(cpf))
      get(queryref).then((snap) => {
        let data = snap.val()
        //console.log(data);
        if (data == null) {
          cpf = "" + parseInt(cpf)
          console.log("cpf", cpf);
          queryref = query(ref(rdb, "/salamais/usuarios/"), orderByChild('cpf'), equalTo(cpf))
          get(queryref).then((snap) => {
            let data = snap.val()
            //console.log(data);
            if (data == null) {
              self.$q.notify(notif.error("CPF não encontrado ou inválido!"))
              self.cpfNotFound = true
            } else {
              data = data[Object.keys(data)[0]]
              //console.log(data);
              localStorage.setItem(btoa("logged"), btoa(JSON.stringify(data)))
              this.userStore.setUser(data)
              self.$emit('onLogin')
              self.dialog = false
            }
          })
        } else {
          data = data[Object.keys(data)[0]]
          //console.log(data);
          localStorage.setItem(btoa("logged"), btoa(JSON.stringify(data)))
          this.userStore.setUser(data)
          self.$emit('onLogin')
          self.dialog = false
        }
      })

    },
    showCadastro() {
      this.dialog = false
      this.$emit("onCadastro")
    }
  }
}
</script>

<style>
</style>