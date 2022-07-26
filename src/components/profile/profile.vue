<template>
    <div class="bg-gray-100 p-2" v-if="user != null">
        <div class="grid grid-cols-5 shadow">
            <avatarEdit :userID="user.id"/>
            <div class="col-span-4 py-4">
                <div class="flex items-center">
                    <div class="fw-800 flato text-base">
                        {{ user.nome }}
                    </div>
                    <div class="pl-2 text-teal-800">
                        <span class="iconify text-xl" data-icon="fluent:book-star-20-regular"></span>
                    </div>
                </div>
                <div class="flex items-center mt-1">
                    <div class="flex itens-center">
                        <div class="text-teal-800">
                            <span class="iconify text-xs" data-icon="icomoon-free:profile"></span>
                        </div>
                        <div class="ml-1 fw-500 flato text-xs">
                            Educador
                        </div>
                    </div>
                    <div class="flex itens-center pl-4" v-if="user.regional != undefined">
                        <div class="text-teal-800">
                            <span class="iconify text-xs" data-icon="icon-park-twotone:local-two"></span>
                        </div>
                        <div class="ml-1 fw-500 flato text-xs">
                            {{ user.regional }}
                        </div>
                    </div>
                    <div class="flex itens-center pl-4">
                        <div class="text-teal-800">
                            <span class="iconify text-xs" data-icon="ic:business"></span>
                        </div>
                        <div class="ml-1 fw-500 flato text-xs">
                            {{ user.ies }}
                        </div>
                    </div>
                    <div class="flex itens-center pl-4">
                        <div class="text-teal-800">
                            <span class="iconify text-xs" data-icon="ic:twotone-mail"></span>
                        </div>
                        <div class="ml-1 fw-500 flato text-[8pt] flato">
                            {{ user.email }}
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-7 mt-1">
                    <div class="border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1">
                        <div>
                            <div class="leading-4 fw-800 flato text-base">
                                {{ qtdeInscricoes }}
                            </div>
                            <div class="leading-4 fw-500 flato text-[7pt] text-gray-500">
                                Inscrições
                            </div>
                        </div>
                    </div>
                    <div class="border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1">
                        <div>
                            <div class="leading-4 fw-800 flato text-base">
                                0
                            </div>
                            <div class="leading-4 fw-500 flato text-[7pt] text-gray-500">
                                Concluídas
                            </div>
                        </div>
                    </div>
                    <div v-if="facilitador" class="border border-gray-100 shadow rounded mt-1 mr-1 px-3 py-1">
                        <div>
                            <div class="leading-4 fw-800 flato text-base">
                                {{ qtdeFacilitador }}
                            </div>
                            <div class="leading-4 fw-500 flato text-[7pt] text-gray-500">
                                Facilitador
                            </div>
                        </div>
                    </div>

                    
                </div>
            </div>
        </div>

        <div class="px-2 mt-1">
            <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                <q-tab name="dados" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Dados pessoais</span>
                </q-tab>
                <q-tab name="inscricoes" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Inscrições</span>
                </q-tab>
                <q-tab v-if="isMe" name="certificados" class=""
                    style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Certificados</span>
                </q-tab>
                <q-tab v-if="isMe && facilitador" name="facilitador" class=""
                    style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Facilitador</span>
                </q-tab>
            </q-tabs>
        </div>
        <div>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel name="dados">
                    <userinfo :user="user" @updated="load" />
                </q-tab-panel>

                <q-tab-panel name="inscricoes">
                    <inscricoes :userID="user.id" :key="refresh" />
                </q-tab-panel>

                <q-tab-panel name="certificados">
                    <div class="text-sm border rounded shadow p-2">
                        Certificados
                    </div>
                </q-tab-panel>

                <q-tab-panel name="facilitador">
                    <div class="text-sm border rounded shadow p-2">
                        <facilitador />
                    </div>
                </q-tab-panel>

            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, orderByChild, equalTo, onValue, query, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../stores/user-store"
import userinfo from "./user-info.vue"
import inscricoes from "./inscricoes/inscricoes.vue"
import facilitador from "@/components/facilitador/facilitador.vue"
import avatarEdit from "./avatar-edit.vue"

export default {
    components: { userinfo, inscricoes, facilitador, avatarEdit },
    props: {},
    data() {
        return {
            refresh: 0,
            tab: 'dados',
            userStore: userStore(),
            user: null,
            facilitador: false,
            qtdeFacilitador: 0,
            qtdeInscricoes: 0,
        }
    },
    computed: {
        isMe() {
            return this.user != null && this.userStore.user.id == this.user.id
        }
    },
    watch: {
        '$route.params': function (newValue) {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {

        load() {
            let self = this
            console.log("formacao mounted", this.$route.params);
            get(ref(rdb, "/salamais/usuarios/"+this.$route.params.id)).then((snap) => {
                let data = snap.val()
                if (data.areas == undefined) {
                    data.areas = []
                }
                if (data.cargo == undefined) {
                    data.cargo = "profHor"
                }
                if (data.campus == undefined) {
                    data.campus = "102"
                }
                if (data.ies == undefined) {
                    data.ies = "USJT"
                }
                self.user = data
                console.log("self.user", self.user);
                self.refresh++
                self.$forceUpdate()
            })

            get(ref(rdb, "/salamais/facilitadores/" + this.userStore.user.id)).then((snap) => {
                let formacoes = snap.val()
                //console.log("formacoes",formacoes);
                if (formacoes != null) {
                    formacoes = formacoes.formacoes
                    self.qtdeFacilitador = 0
                    for (let i in formacoes) {
                        for (let k in formacoes[i].encontros) {
                            self.qtdeFacilitador++
                        }
                    }
                    self.facilitador = true
                } else {
                    self.facilitador = false
                    self.qtdeFacilitador = 0
                }
            })

            let queryRef = query(ref(rdb, "/salamais/inscricoes"), orderByChild('userID'), equalTo(this.userStore.user.id))
            onValue(queryRef, (snap) => {
                self.qtdeInscricoes = 0
                let inscricoes = snap.val()
                console.log("inscricoes", inscricoes);
                for (let i in inscricoes) {
                    for (let k in inscricoes[i].encontros) {
                        self.qtdeInscricoes++
                    }
                }
            })

        }
    },
}
</script>
<style lang="">
    
</style>