<template>
  <q-dialog v-model="dialog">
    <q-card>
      <q-toolbar class="h-[80px]">
        <q-avatar size="26px">
          <img src="../assets/salamais-icon.png">
        </q-avatar>
        <q-toolbar-title>
          <span class="text-sm fw-600">
            Cadastro de dados de acesso
          </span>
        </q-toolbar-title>
        <q-btn flat round dense icon="close" v-close-popup />
      </q-toolbar>
      <div v-if="user == null">
        <div class="mx-4 mt-1 mb-4 border p-2 rounded shadow bg-violet-100">
          <p class="finter fw-300 text-[9pt] m-0">
            Digite um email válido e que você costuma acessar com frequência
          </p>
        </div>
        <div class="mx-4 mb-2">
          <div class="col-span-1 px-2">
            <FormKit type="email" v-model='email' label='Email *' help='Indique um email válido' :classes="inputCss"
              validation="required|email" />
          </div>
        </div>
        <div class="flex justify-center mb-2">
          <button @click="proximo"
            class="flex items-center text-sm border py-1 px-4 rounded bg-cyan-900 hover:bg-cyan-800 text-white fw-300">
            <span class="iconify mr-2" data-icon="ic:outline-login" data-inline="false"></span>
            Próximo
          </button>
        </div>
      </div>
      <div v-if="user != null">
        <div class="mx-4 mt-1 mb-4 border p-2 rounded shadow bg-red-300">
          <p class="finter fw-300 text-[9pt] m-0">
            Este email já está cadastrado em nossa base de usuários!
          </p>
        </div>
        <div class="mx-4 mt-1 mb-4 border p-2 rounded shadow">
          <div class="finter fw-300 text-[9pt] m-0">
            <span class="mr-1 fw-500">Nome:</span>
            <span class="text-[8pt]">{{ user.nome }}</span>
          </div>
          <div class="finter fw-300 text-[9pt] m-0">
            <span class="mr-1 fw-500">Email:</span>
            <span class="text-[8pt]">{{ user.email }}</span>
          </div>
          <div class="finter fw-300 text-[9pt] m-0">
            <span class="mr-1 fw-500">CPF:</span>
            <span v-if="user.cpf != undefined" class="text-[9pt] fw-600">{{ user.cpf }}</span>
            <span v-if="user.cpf == undefined" class="text-[9pt] fw-600 text-red-800">
              Não encontrado!
            </span>
            <span v-if="user.cpf == ''" class="text-[9pt] fw-600 text-red-800">
              (Não cadastrado)
            </span>
          </div>
        </div>
        <div class="mx-4" v-if="user.cpf == undefined || user.cpf == ''">
          <div class="text-center mb-2">
            <span class="bg-gray-200 rounded p-1 shadow text-xs fw-300">
              Indique seu CPF para cadastro de acesso
            </span>
          </div>
          <div class="px-2 mb-3">
            <div class="fw-600 text-[9pt]">CPF *</div>
            <q-input class="text-xs" dense outlined v-model="cpf" mask="###.###.###-##" />
          </div>
          <div class="flex justify-center mb-2">
            <button @click="cadastroCPF"
              class="flex items-center text-sm border py-1 px-4 rounded bg-cyan-900 hover:bg-cyan-800 text-white fw-300">
              <span class="iconify mr-2" data-icon="ic:save" data-inline="false"></span>
              Cadastrar CPF
            </button>
          </div>
        </div>
        <div class="flex justify-center mb-2" v-if="user == null">
          <button @click="proximo"
            class="flex items-center text-sm border py-1 px-4 rounded bg-cyan-900 hover:bg-cyan-800 text-white fw-300">
            <span class="iconify mr-2" data-icon="ic:outline-login" data-inline="false"></span>
            Próximo
          </button>
        </div>
        <div class="" v-if="user.cpf != undefined && user.cpf != ''">
          <div class="text-center mb-2">
            <span class="bg-gray-200 rounded p-1 shadow text-xs fw-300">
              Tente acessar com o CPF informado acima
            </span>
          </div>
          <div class="flex justify-center mb-2">
            <button @click="dialog = false"
              class="flex items-center text-sm border py-1 px-4 rounded bg-cyan-900 hover:bg-cyan-800 text-white fw-300">
              <span class="iconify mr-2" data-icon="ic:check" data-inline="false"></span>
              Ok
            </button>
          </div>
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
      email: "",
      cpf: "",
      user: null,
      userStore: userStore(),
      inputCss: { inner: 'h-7 text-[8pt] fw-700' },
    }
  },
  methods: {
    show() {
      this.user = null
      this.cpf = ""
      this.dialog = true
    },
    proximo() {
      let self = this
      if (this.email == "") {
        this.$q.notify(notif.error("Email obrigatório!"))
        return
      }
      let er = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
      if (!er.test(this.email)) {
        this.$q.notify(notif.error("Email inválido!"))
        return
      }
      let queryref = query(ref(rdb, "/salamais/usuarios/"), orderByChild('email'), equalTo(this.email))
      get(queryref).then((snap) => {
        let data = snapToArray(snap)
        console.log(data);
        if (data.length == 0) {
          self.$emit('showCadastro', {
            nome: "",
            cpf: "",
            telefone: "",
            email: self.email,
            areas: [],
            urlFoto: "https://firebasestorage.googleapis.com/v0/b/appintegra-d8424.appspot.com/o/responsaveis%2Fdummy.png?alt=media&token=f785c7d3-f03c-4311-acec-983e2f9e9103"
          })
          self.dialog = false
        } else {
          //self.$emit('showCadastro', data[0])
          self.user = data[0]
        }
      })
    },

    verificaCPF(strCPF) {
      let soma = 0, resto;
      if (strCPF == "00000000000") return false;
      for (let i = 1; i <= 9; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(strCPF.substring(9, 10))) return false;
      soma = 0;
      for (let i = 1; i <= 10; i++) soma = soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
      resto = (soma * 10) % 11;
      if ((resto == 10) || (resto == 11)) resto = 0;
      if (resto != parseInt(strCPF.substring(10, 11))) return false;
      return true;
    },

    cadastroCPF() {
      let self = this
      if (this.cpf == "") {
        this.$q.notify(notif.error("CPF obrigatório!"))
        return
      }
      let cpf = this.cpf.replaceAll("-", "").replaceAll(".", "")
      console.log(cpf);
      if (!this.verificaCPF(cpf)) {
        this.$q.notify(notif.error("CPF inválido!"))
        return
      }
      console.log(self.user);
      self.user.cpf = cpf
      set(ref(rdb, "/salamais/usuarios/" + data.id), data)
      //let model = cb("salamais").coll("usuarios")
      //model.set(self.user).then((data) => {
      this.$q.notify(notif.success("CPF cadastrado com sucesso!"))
      self.dialog = false
      //})
    }

  }
}
</script>

<style>
</style>