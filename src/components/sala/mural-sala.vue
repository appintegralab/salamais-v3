<template>
    <div class="grid grid-cols-7">
        <div class="col-span-7 sm:col-span-2 pr-2">
            <div class="border rounded p-1 text-sm">
                <div class="fw-600 text-[10pt]">
                    Facilitadores
                </div>
                <hr class="mb-1">
                <div class="fw-600 text-[8pt]">
                    <div v-if="sala != null">
                        <facilitadoravatar :userID="userID" v-for="(userID, index) in sala.facilitadores"
                            :key="index" />
                    </div>

                </div>
            </div>

            <div class="border rounded p-1 mt-2 text-sm">
                <div class="fw-600 text-[10pt]">
                    Link da sala
                </div>
                <hr class="mb-1">
                <div class="fw-600 text-[8pt]">
                    <span class="ml-1 rounded bg-slate-200">
                        <q-btn size="7px" round color="blue-grey-1">
                            <span class="iconify text-[9pt] text-slate-800" data-icon="ion:link"></span>
                            <q-tooltip :delay="600">
                                Copiar link
                            </q-tooltip>
                        </q-btn>
                        <span class="text-[9pt] py-2 text-red-800 pr-1 ml-1 fw-400 fmohave" v-if="sala.link == ''">
                            link não informado
                        </span>
                        <span class="text-[9pt] pr-1 ml-1 fw-400 froboto" v-if="sala.link != ''">
                            {{ sala.link }}
                        </span>
                    </span>
                </div>
            </div>

            <div v-if="!isFacilitador" class="border rounded p-1 mt-2 text-sm">
                <div class="fw-600 text-[10pt]">
                    Presença
                </div>
                <hr class="mb-1">
                <presenca :formacao="formacao" :encontro="encontro" />
            </div>

        </div>
        <div class="col-span-7 sm:col-span-5 pl-2">
            <mural />
        </div>
    </div>
</template>

<script>
import facilitadoravatar from "./facilitador-avatar.vue"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import presenca from "./presenca.vue"
import mural from "./mural/mural.vue"
import salaTool from '@/components/utils/salaTool'

export default {
    components: { facilitadoravatar, presenca, mural },
    props: {
        encontro: { default: null, type: Object },
        formacao: { default: null, type: Object },
        sala: { default: null, type: Object }
    },
    data() {
        return {
            refresh: 0,
            inputCss: { outer: "flex-1", inner: 'h-7 text-[8pt] fw-700', help: "text-[7pt] mt-2" },
            mensagem: "",
            presencaLiberada: false,
            userStore: userStore(),
            salaTool: salaTool(),
            isFacilitador: false,
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            this.salaTool.init(this.$route.params.id, (salaTool) => {
                self.salaTool = salaTool
                self.isFacilitador = self.salaTool.isFacilitador(self.userStore.user.id)
                console.log("salaTool", salaTool);
            })
        }
    },
}
</script>
<style lang="">
    
</style>