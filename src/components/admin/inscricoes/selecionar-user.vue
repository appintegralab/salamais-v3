<template>
    <span>
        <q-btn class="flex items-center text-[8pt] pr-2 pl-1 py-0" size="8px" outline color="blue-grey-8">
            <span class="iconify mr-1 text-[9pt]" data-icon="mdi:account-edit-outline"></span>
            <span class="mt-[2px]">adicionar</span>
            <q-menu v-model="menuShow">
                <div class="w-[300px]">
                    <div class="flex items-center justify-between p-2 pl-3 bg-slate-200 text-xs fw-300">
                        <div>
                            Selecione um usuário
                        </div>
                        <div v-if="false">
                            <q-btn @click="selecionar(null)" class="flex items-center text-[8pt] pr-2 pl-1 py-0"
                                size="8px" outline color="red-8">
                                <span class="iconify mr-1 text-[7pt]" data-icon="mdi:remove"></span>
                                <span class="mt-[2px]">excluir facilitador</span>
                            </q-btn>
                        </div>
                    </div>

                    <div class="mx-2 p-2 border rounded">

                        <q-table dense :pagination="{ rowsPerPage: 20 }" :rows="users" :filter="filter"
                            :columns="columns" table-colspan="1">
                            <template v-slot:top>
                                <div class="w-full">
                                    <div class="p-1 flex items-center justify-between">
                                        <div class="flex items-center">
                                            <div class="-mb-2 w-[160px]">
                                                <FormKit v-model="filter" :classes="{ inner: 'h-5' }" type="text"
                                                    placeholder="Filtrar" />
                                            </div>
                                            <div class="pl-1 -mt-1">
                                                <span class="iconify text-[11pt]" data-icon="mi:search"></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <template v-slot:header>

                            </template>
                            <template v-slot:body="props">
                                <div :props="props" class="">
                                    <div class="px-1">
                                        <div @click="selecionar(props.row)"
                                            class="flex items-center p-1 border rounded hover:bg-gray-200 cursor-pointer">
                                            <div>
                                                <q-avatar size="26px">
                                                    <q-img :src="props.row.urlFoto" />
                                                </q-avatar>
                                            </div>
                                            <div class="flex-1 ml-1 text-ellipsis truncate">
                                                <div class="leading-3 text-[8pt] fw-500 flato pt-1">
                                                    {{ props.row.nome }}
                                                </div>
                                                <div class="leading-3 text-[7pt] flato fw-300 -mt-[1px]">
                                                    {{ props.row.email }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </q-table>
                    </div>

                </div>
            </q-menu>
        </q-btn>
    </span>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"

export default {
    data() {
        return {
            inputCss: { inner: 'h-7 text-[8pt] fw-700' },
            menuShow: false,
            users: [],
            filter: "",
            columns: [
                { label: '', field: 'nome', align: 'left', sortable: true },
                //{ label: '', field: 'dataInicio' },
            ],
        }
    },
    mounted() {
        let self = this
        //console.log("dialog mounted", userStore.user);
        onValue(ref(rdb, "/salamais/usuarios"), (snap) => {
            let data = snapToArray(snap)
            self.users = data
        })
    },
    methods: {

        selecionar(user) {
            //console.log(user);
            this.menuShow = false
            this.$emit('onSelect', user)
        }
    }
}
</script>
<style>
</style>