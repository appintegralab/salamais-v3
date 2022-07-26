<template>
    <div class="m-1 p-2 border">
        <div class="fw-600">
            Formações 2022/2
        </div>
        <div class="border-t mt-1 mb-3 mr-3"></div>
        <div v-if="qtde == 0">
            <div class="border rounded shadow p-1 text-xs fw-300 bg-slate-200">
                Nenhuma formação disponível para inscrição
            </div>
        </div>
        <div class="py-1 pr-3">
            <div v-for="(formacao, index) in formacoes" :key="index">
                <formacao v-if="!formacao.inscricao" :formacao="formacao" @inscricao="inscricao" />
                <formacaoInscrito v-if="formacao.inscricao" :formacao="formacao" @inscricao="inscricao" />
                <hr class="mb-3 ml-4 border-8 bg-gray-300"/>
            </div>

        </div>
        <dialoginscricao ref="dialoginscricaoref" @novaInscricao="novaInscricao" />
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import dialoginscricao from "./dialog-inscricao.vue"
import { userStore } from "../../stores/user-store"
import formacao from "./caixa-formacao.vue"
import { db, rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import formacaoInscrito from "@/components/minhas-formacoes/caixa-formacao-insc.vue"
import lodash from "lodash"

export default {
    components: { dialoginscricao, formacao, formacaoInscrito },
    data() {
        return {
            userStore: userStore(),
            formacoes: [],
            qtde: 0
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        let self = this
        console.log("home mounted");
        this.load()
        //let model = cb("salamais").coll("formacoes")
        //model.listen(() => {
        //    self.load()
        //})
    },
    methods: {

        load() {
            let self = this
            //let inscModel = cb("salamais").coll("inscricoes")
            this.qtde = 0
            //console.log("this.userStore.user", this.userStore.user);
            if (this.userStore.user == undefined) return
            
            let queryRef = query(rdbref("inscricoes"), orderByChild('userID'), equalTo(this.userStore.user.id))
            onValue(queryRef, (snap) => {
                let inscricoes = snap.val()
                console.log("inscricoes", inscricoes);
                if (inscricoes != null) {
                    get(rdbref("formacoes")).then((snap) => {
                        let formacoes = snapToArray(snap)
                        if (formacoes != null) {
                            formacoes = lodash.orderBy(formacoes,'dataInicio','asc')
                            console.log("formacoes", formacoes);
                            for (let i in formacoes) {
                                formacoes[i].inscricao = false
                                formacoes[i].dataInscricao = ""
                                formacoes[i].opcao = 0
                                for (let idx in inscricoes) {
                                    //console.log(formacoes[i].id);
                                    //console.log(inscricoes[idx].formacaoID);
                                    if (formacoes[i].id == inscricoes[idx].formacaoID) {
                                        formacoes[i].inscricaoID = inscricoes[idx].id
                                        formacoes[i].inscricao = true
                                        formacoes[i].dataInscricao = inscricoes[idx].createdAt
                                        formacoes[i].inscEncontros = inscricoes[idx].encontros
                                        break
                                    }
                                }
                            }
                            self.formacoes = formacoes
                            console.log("formacoes", formacoes);
                            for (let i in formacoes) {
                                if (!formacoes[i].inscricao) {
                                    self.qtde++
                                }
                            }
                        }
                    })
                }
                else {
                    get(rdbref("formacoes")).then((snap) => {
                        let formacoes = snapToArray(snap)
                        if (formacoes != null) {
                            formacoes = lodash.orderBy(formacoes,'dataInicio','asc')
                            console.log("formacoes", formacoes);
                            self.formacoes = formacoes
                            self.qtde = Object.keys(formacoes).length
                        }
                    })
                }
            })

        },
        inscricao(formacao) {
            this.$refs.dialoginscricaoref.show(formacao)
        },
        novaInscricao() {
            this.load()
        }
    }
}
</script>

<style>
</style>