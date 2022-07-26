<template>
    <div class="m-1 p-2 border">
        <div class="fw-600">
            Minhas inscrições
        </div>
        <div class="border-t mt-1 mb-3 mr-3"></div>

        <div class="py-1 pr-3">
            <div v-if="formacoes.length == 0">
                <div class="border rounded shadow p-1 text-xs fw-300 bg-slate-200">
                    Nenhuma inscrição foi encontrada
                </div>
            </div>
            <div v-for="(formacao, index) in formacoes" :key="index + refresh">
                <!-- <formacao v-if="!formacao.inscricao" :formacao="formacao" @inscricao="inscricao" /> -->
                <formacaoinsc class="" v-if="formacao.inscricao" :formacao="formacao" @removeInscricao="novaInscricao" />
                <hr class="mb-3 ml-4 border-8 bg-gray-300">
            </div>

        </div>

    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../stores/user-store"
import formacao from "../home/caixa-formacao.vue"
import formacaoinsc from "./caixa-formacao-insc.vue"
import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"


export default {
    components: { formacao, formacaoinsc },
    data() {
        return {
            refresh: 0,
            userStore: userStore(),
            inscricoes: [],
            formacoes: [],
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {
        console.log("minhas-formações mounted");
        this.load()
        //console.log("email",email01);
    },
    methods: {
        load() {
            let self = this
            if(this.userStore.user == undefined) return
            let queryRef = query(ref(rdb, "/salamais/inscricoes"), orderByChild('userID'), equalTo(this.userStore.user.id))
            onValue(queryRef, (snap) => {
                let inscricoes = snap.val()
                console.log("inscricoes", inscricoes);
                self.formacoes = []
                if (inscricoes != null) {
                    self.formacoes = []
                    //console.log("inscricoes", inscricoes);
                    async function getFormacao(inscricao) {
                        //console.log("inscricao", inscricao);
                        //let data = await cb("salamais").coll("formacoes").getID(inscricao.formacaoID)
                        let snap = await get(ref(rdb,"/salamais/formacoes/" + inscricao.formacaoID))
                        let formacao = snap.val()
                        console.log("formacao", formacao);
                        formacao.inscricao = false
                        formacao.dataInscricao = ""
                        formacao.opcao = 0
                        formacao.inscricaoID = inscricao.id
                        formacao.inscricao = true
                        formacao.dataInscricao = inscricao.createdAt
                        formacao.inscEncontros = inscricao.encontros
                        //console.log("formacao", formacao);
                        self.formacoes.push(formacao)
                    }
                    async function setFormacoes() {
                        for (let i in inscricoes) {
                            await getFormacao(inscricoes[i])
                        }
                        self.inscricoes = inscricoes
                        console.log("inscricoes", inscricoes);
                        console.log("self.formacoes", self.formacoes);
                        self.refresh++
                        self.$forceUpdate()
                    }
                    setFormacoes()
                }
            })
        },

        verInformacoes() {
            console.log("verInformacoes");
        },

        inscricao(formacao) {
            this.$refs.dialoginscricaoref.show(formacao)
        },
        novaInscricao() {
            let self = this
            self.load()
        }

    }
}
</script>

<style>
</style>