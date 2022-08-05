<template >
    <div class="m-2 p-2 border rounded">
        <div class="flex items-center">
            <i class="iconify text-lg" data-icon="ic:twotone-dashboard-customize" data-inline="false"></i>
            <span class="ml-1">Dashboards</span>
        </div>
        <hr class="my-2">
        <div class="px-2 mt-1">
            <q-tabs v-model="tab" class="text-slate-900" align="left" dense>
                <q-tab name="participacao" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[10pt]">Participação</span>
                </q-tab>
                <q-tab name="pesquisa" class="" style="height: 30px; max-height: 30px; min-height: 30px">
                    <span class="text-[10pt]">Pesquisa</span>
                </q-tab>
            </q-tabs>
        </div>
        <div>
            <q-tab-panels v-model="tab" animated swipeable vertical transition-prev="jump-up" transition-next="jump-up">
                <q-tab-panel name="participacao">
                    <participacao />
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>

<script>
import XLSX from "xlsx"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { db, rdb, snapToArray, rdbref } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"
import { defineAsyncComponent } from "vue";

export default {
    components: {
        "participacao": defineAsyncComponent({ loader: () => import('./participacao.vue') }),
    },
    data() {
        return {
            tab: "participacao"
        }
    },
    mounted() {
        console.log("mounted");

    },
    methods: {


    },
}
</script>