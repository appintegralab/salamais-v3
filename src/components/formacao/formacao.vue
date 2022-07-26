<template>
    <div v-if="formacao != null">
        <!-- hero -->
        <div class="hero bg-gray-100 py-2 m-1 mx-2 rounded shadow">
            <!-- container -->
            <div class="container px-4 sm:px-4 lg:px-6 xl:px-6 mx-auto">
                <!-- hero wrapper -->
                <div class="hero-wrapper grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <!-- hero text -->
                    <div class="hero-text col-span-6">
                        <h1 class="flex items-center font-bold text-lg md:text-lg max-w-lg text-gray-900 leading-tight">
                            <div>
                                <span class="iconify text-purple-900 text-5xl mr-1" data-icon="ic:school"></span>
                                <hr class="w-12 h-[4px] bg-purple-900 rounded-full mt-0">
                            </div>
                            <div class="flex-1 leading-3 ml-2">
                                <div class="pt-2 m-0 fw-200 text-[8pt] border-b border-gray-300">
                                    Formação
                                </div>
                                <div class="mt-2 leading-5 text-[13pt]">
                                    {{ formacao.nome }}
                                </div>
                            </div>
                        </h1>
                        <p class="leading-4 text-gray-800 text-[8pt] mt-2 font-light">
                            {{ formacao.descr }}
                        </p>
                        <div>
                            <!-- DATA ÚNICA -->
                            <div class="my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio == formacao.dataTermino">
                                <span>DATA:</span>
                                <span class="ml-1 text-[8pt] fw-500 px-1 pt-[2px] rounded text-green-700 bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                </span>
                                <span class="ml-1 text-[9pt] fw-300">
                                    ({{ moment(formacao.dataInicio).locale('pt-br').format('dddd') }})
                                </span>
                            </div>

                            <!-- PERÍODO -->
                            <div class="my-[3px] fw-400 text-[8pt]" v-if="formacao.dataInicio != formacao.dataTermino">
                                <span class="fw-500 text-[8pt]">Período:</span>
                                <span
                                    class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200">
                                    {{ moment(formacao.dataInicio).format("DD/MM/YYYY") }}
                                    <span class="text-[6pt]">
                                        ({{ moment(formacao.dataInicio).locale('pt-br').format('ddd').toUpperCase() }})
                                    </span>
                                </span>
                                <span class="px-1">até</span>
                                <span
                                    class="ml-1 text-[7pt] fw-500 pl-[1px] pt-[2px] rounded text-green-700 bg-slate-200">
                                    {{ moment(formacao.dataTermino).format("DD/MM/YYYY") }}
                                    <span class="text-[6pt]">
                                        ({{ moment(formacao.dataTermino).locale('pt-br').format('ddd').toUpperCase() }})
                                    </span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <!-- hero image -->
                    <div class="hero-image col-span-6" v-if="false">
                        <div class="flex mt-1 justify-start">
                            <superbotao v-for="(item, index) in menu" :key="index" @onclick="menuSel(index)"
                                :options="item" />
                        </div>
                    </div>
                </div>
            </div>
        </div><!-- end hero -->

        <div class="px-2 mt-1">
            <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                <q-tab name="mural" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Mural</span>
                </q-tab>
                <q-tab name="materiais" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[8pt]">Materiais de apoio</span>
                </q-tab>
            </q-tabs>
        </div>
        <div>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel name="mural">
                    <mural :formacao="formacao" />
                </q-tab-panel>

                <q-tab-panel name="materiais">
                    <materiais />
                </q-tab-panel>
            </q-tab-panels>
        </div>

    </div>
</template>

<script>
import superbotao from "./super-botao.vue"
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, orderByChild, equalTo, onValue, query, get } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../stores/user-store"
import mural from "./mural.vue"
import badgearea from "@/components/utils/badge-area.vue"
import materiais from "./materiais.vue"

export default {
    components: { superbotao, mural, badgearea, materiais },
    data() {
        return {
            menu: [
                { selected: true, color: "#581c87", icon: "ic:school", title: "Formação", subTitle: "Informações gerais" },
                { selected: false, color: "#991b1b", icon: "ic:sharp-account-tree", title: "Materiais", subTitle: "Recursos / Materiais" },
                { selected: false, color: "#d97706", icon: "ic:link", title: "Acessar", subTitle: "Link para formação" },
                { selected: false, color: "#115e59", icon: "ic:twotone-co-present", title: "Participantes", subTitle: "ver participantes" },
            ],
            formacao: null,
            tab: "mural",
        }
    },
    computed: {
        moment() {
            return moment
        },
    },
    watch: {
        "$route.params": function() {
            this.load()
        }
    },
    mounted() {
        let self = this
        //console.log("formacao mounted", this.$route.params);
        this.load()
    },
    methods: {

        load() {
             let self = this
            get(ref(rdb, "/salamais/formacoes/" + this.$route.params.id)).then((snap) => {
                let data = snap.val()
                self.formacao = data
                console.log("self.formacao", self.formacao);
            })
        },

        menuSel(index) {
            console.log(index);
            for (let i in this.menu) {
                if (i == index) {
                    this.menu[i].selected = true
                } else {
                    this.menu[i].selected = false
                }
            }
        }
    },
}
</script>
<style lang="">
    
</style>