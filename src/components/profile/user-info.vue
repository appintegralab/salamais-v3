<template>
    <div v-if="user != null">
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-3 sm:col-span-3 md:col-span-3 pb-1 text-xs border-b fw-500">
                Dados pessoais
            </div>
            <div v-if="isUserLog" class="col-span-1 pb-1 text-xs border-b fw-500 flex justify-end">
                <q-btn @click="$refs.formedituserref.show(user)" size="xs" class="px-2 flex items-center">
                    <span class="iconify mr-1 text-[8pt]" data-icon="ic:edit"></span>
                    <span class="text-[7pt] pt-[2px]">editar</span>
                </q-btn>
            </div>
        </div>
        <div class="mt-2 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Nome:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.nome }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                CPF:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.cpf }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Email:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.email }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Telefone:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.telefone }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Cargo:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ cargoNome }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                IES:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.ies }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Regional:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.regional }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Campus:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                {{ user.campus }} - {{ campusNome }}
            </div>
        </div>
        <div class="mt-1 grid grid-cols-4 sm:grid-cols-6 md:grid-cols-7">
            <div class="col-span-1 bg-slate-200 border rounded p-1 text-xs fraleway fw-600">
                Áreas:
            </div>
            <div class="col-span-3 sm:col-span-3 md:col-span-3 ml-2 p-1 border rounded text-xs flato fw-400">
                <div class="flex items-center" v-if="Object.keys(areas).length>0">
                    <div class="mr-2 pb-1 flex items-center" v-for="(area, index) in user.areas" :key="index">
                        <div v-if="!$q.screen.xs" :style="'background-color:' + areas[area].cor"
                            class="text-[5pt] fw-400 py-0 px-1 rounded text-white">
                            {{ areas[area].sigla }}
                        </div>
                        <div :style="'color:' + area.cor" class="ml-1 text-[6pt] sm:text-[6pt] fw-600">
                            {{ areas[area].nome }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <formedituser ref="formedituserref" @updated="$emit('updated')"/>
    </div>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import formedituser from "./form-edit-user.vue"
import cargos from "./cargos.js"
import campus from "./campus.js"
import { userStore } from "../../stores/user-store"

export default {
    components: { formedituser },
    props: {
        user: { default: null, type: Object }
    },
    data() {
        return {
            tab: 'mails',
            areas: {},
            userStore: userStore(),
        }
    },
    computed: {
        campusNome() {
            return campus[this.user.campus].nome
        },
        cargoNome() {
            return cargos[this.user.cargo].cargo
        },
        isUserLog() {
            return this.userStore.user.id == this.user.id
        }
    },
    mounted() {
        let self = this
        get(ref(rdb, "/salamais/areas/")).then((snap) => {
            let data = snap.val()
            //console.log("areas",data);
            for(let i in data) {
                self.areas[data[i].id] = data[i]
            }
        })
    },
    methods: {

    },
}
</script>
<style lang="">
    
</style>