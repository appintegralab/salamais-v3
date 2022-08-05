<template>
    <div>
        <div class="mx-4 my-1 pt-2 fw-500">
            Usuários
        </div>
        <div class="mx-4">
            <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="rows" :filter="filter" :columns="columns"
                row-key="name">
                <template v-slot:top>
                    <div class="w-full">
                        <div class="p-1 flex items-center justify-between">
                            <div class="flex items-center">
                                <div class="-mb-2">
                                    <FormKit v-model="filter" :classes="{ inner: 'h-7' }" type="text"
                                        placeholder="Filtrar" />
                                </div>
                                <div class="pl-1">
                                    <span class="iconify text-[14pt]" data-icon="mi:search"></span>
                                </div>
                            </div>
                            <div>
                                
                                <q-btn v-if="isMarcelo" size="xs" class="px-2 mr-3" @click="corrigirCPFs">
                                    <span class="iconify text-[12pt] mr-1" data-icon="ion:warning" />
                                    corrigir CPFs
                                </q-btn>

                                <q-btn size="xs" class="px-2" @click="$refs.dialoguserref.show()">
                                    <span class="iconify text-[12pt] mr-1" data-icon="ion:add-circle-outline" />
                                    adicionar usuário
                                </q-btn>
                            </div>
                        </div>
                    </div>
                </template>
                <template v-slot:body="props">
                    <q-tr :props="props">
                        <q-td>
                            <span class="text-[6pt]">{{ props.row.id }}</span>
                        </q-td>
                        <q-td>
                            <div class="flex items-center">
                                <q-avatar size="xs">
                                    <q-img class="w-[20px] h-[20px]" :src="props.row.urlFoto" />
                                </q-avatar>
                                <div class="ml-1">
                                    <span class="text-[7pt]">{{ props.row.nome }}</span>
                                </div>
                                <div class="ml-1">
                                    <q-btn size="5px" round @click="$router.push({ path: '/profile/' + props.row.id })">
                                        <span class="iconify text-[7pt]" data-icon="ic:outline-remove-red-eye"></span>
                                        <q-tooltip>
                                            ver perfil
                                        </q-tooltip>
                                    </q-btn>
                                </div>
                            </div>
                        </q-td>
                        <q-td>
                            <span class="text-[7pt]">{{ props.row.cpf }}</span>
                        </q-td>
                        <q-td>
                            <span class="text-[7pt]">{{ props.row.email }}</span>
                        </q-td>
                        <q-td>
                            <q-btn @click="$refs.dialoguserref.show(props.row)" round size="xs" class="bg-gray-200">
                                <span class="iconify text-[10pt]" data-icon="mi:edit"></span>
                            </q-btn>
                            <q-btn round size="xs" class="ml-2 bg-gray-400">
                                <span class="iconify text-[10pt]" data-icon="mi:delete"></span>
                                <q-menu v-model="removeDialog[props.row.id]">
                                    <div class="rounded w-[200px]">
                                        <div class="flex p-1 bg-red-800 text-white">
                                            <div class="text-[10pt] px-1">
                                                <span class="iconify" data-icon="mdi:warning"></span>
                                            </div>
                                            <div class="text-[8pt] fw-700">Deseja realmente excluir o item?</div>
                                        </div>
                                        <div class="flex justify-around p-2">
                                            <q-btn @click="removeDialog[props.row.id] = false" size="xs">cancelar
                                            </q-btn>
                                            <q-btn @click="excluir(props.row)" class="bg-red-800 text-white" size="xs">
                                                sim</q-btn>
                                        </div>
                                    </div>
                                </q-menu>
                            </q-btn>
                        </q-td>
                    </q-tr>
                </template>
            </q-table>
        </div>
        <dialoguser ref="dialoguserref" />
    </div>
</template>

<script>
import { rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { userStore } from "../../../stores/user-store"
import dialoguser from "./dialog-user.vue"
import notif from "../../../notif.js"

export default {
    components: {
        dialoguser
    },
    data() {
        return {
            filter: "",
            columns: [
                { label: 'ID', align: 'left', sortable: true },
                { label: 'Nome', field: 'nome', align: 'left', sortable: true },
                { label: 'cpf', field: 'cpf', align: 'left', sortable: true },
                { label: 'email', align: 'left', sortable: true },
                //{ label: 'Descrição', align: 'left', sortable: true },
                { label: '', sortable: false },
            ],
            rows: [],
            removeDialog: {},
            userStore: userStore(),
        }
    },
    computed: {
        moment() {
            return moment
        },
        isMarcelo() {
            let cpf = this.userStore.user.cpf
            if (cpf == '18374109840') {
                return true
            } 
            return false
        }
    },
    mounted() {
        let self = this
        this.load()

    },
    methods: {

        load() {
            let self = this

            onValue(rdbref("usuarios"), (snap) => {
                self.rows = snapToArray(snap)
            })
        },

        excluir(item) {
            let self = this
            this.removeDialog = false
            console.log(item);
            set(rdbref("usuarios/" + item.id), null)
            self.$q.notify(notif.success("Usuário excluido com sucesso"))
        },

        corrigirCPFs() {
            console.log("corrigirCPFs");
            //console.log("this.rows",this.rows);
            let cpfs = []
            for(let i in this.rows) {
                let cpf = ""+this.rows[i].cpf
                if(cpf.indexOf(".") != -1) {
                    let newCpf = cpf.replaceAll("-","").replaceAll(".","")
                    cpfs.push({
                        id: this.rows[i].id,
                        cpf: cpf,
                        newCpf
                    })
                    set(rdbref("usuarios/"+this.rows[i].id+"/cpf"),newCpf)
                }
            }
            console.log("cpfs",cpfs);
        }
    }
}
</script>

<style lang="scss" scoped>
</style>