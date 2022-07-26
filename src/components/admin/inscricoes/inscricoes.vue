<template>
    <div>
        <div class="mx-3 my-1 pt-2 fw-500 border-b mb-2">
            Controle de inscrições
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 pl-3 pr-1">
            <div class="px-2 pb-1">
                <div class="border rounded p-1 fw-500 text-sm bg-gray-200 mb-1">
                    Formações
                </div>
                <div class="px-1">
                    <listaformacao @select="selectFormacao" />
                </div>
            </div>
            <div class="col-span-1 md:col-span-2 px-2 pb-1">
                <div class="border rounded p-1 fw-500 text-sm bg-gray-200 mb-1">
                    Inscrições
                </div>
                <div v-if="formacaoSel != null">
                    <inscricaoinfo :formacao="formacaoSel" @salaUpdate="salaUpdate" />
                </div>
                <div v-if="formacaoSel == null">
                    <div class="border rounded p-4 text-xs fw-300">
                        Selecione uma formação
                    </div>
                </div>
            </div>
        </div>

        <!-- <dialogformacao ref="dialogformacaoref" /> -->
    </div>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import listaformacao from "./lista-formacoes.vue"
import inscricaoinfo from "./inscricao-info.vue"
import notif from "../../../notif.js"

export default {
    components: {
        listaformacao, inscricaoinfo
    },
    data() {
        return {
            formacaoSel: null
        }
    },
    computed: {
        moment() {
            return moment
        }
    },
    mounted() {

    },
    methods: {

        selectFormacao(formacao) {
            this.formacaoSel = formacao
        },

        salaUpdate() {
            let self = this
            console.log("salaUpdate");
            console.log("this.formacaoSel", this.formacaoSel);
            if (this.formacaoSel != null) {
                get(ref(rdb,"/salamais/formacoes/"+this.formacaoSel.id)).then((snap)=> {
                    self.formacaoSel = snap.val()
                })
//                let model = cb("salamais").coll("formacoes")
//                model.getID(this.formacaoSel.id).then((data) => {
//                    self.formacaoSel = data
//                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
</style>