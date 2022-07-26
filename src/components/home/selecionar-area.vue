<template>
    <span>
        <q-btn size="4px" class="px-1 pt-[6px]">
            <span class="text-[8pt] fw-300 lowercase">Selecionar área</span>
            <q-menu v-model="menuShow">
                <div class="w-[300px]">
                    <div class="p-2 pl-3 bg-slate-200 text-xs fw-300">
                        Selecione uma área de conhecimento
                    </div>
                    <div class="px-2 my-1" v-for="(area, index) in areas" :key="index">
                        <div @click="selecionar(area)" class="flex items-center p-1 border rounded cursor-pointer hover:bg-gray-200">
                            <div :style="'background-color:' + area.cor"
                                class="leading-3 ml-1 text-[6pt] fw-700 px-1 pt-[1px] rounded text-white">
                                {{ area.sigla }}
                            </div>
                            <div :style="'color:' + area.cor" class="ml-1 text-[7pt] text-purple-900 fw-700">
                                {{ area.nome }}
                            </div>
                        </div>
                    </div>
                </div>
            </q-menu>
        </q-btn>
    </span>
</template>

<script>
import { db, rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, get, onValue, query, orderByChild, equalTo } from "firebase/database"

export default {
    data() {
        return {
            menuShow: false,
            areas: [],
        }
    },
    mounted() {
        let self = this
        //console.log("dialog mounted", userStore.user);
        get(ref(rdb, "/salamais/areas/")).then((snap) => {
            let data = snap.val()
            self.areas = data
        })
    },
    methods: {
        selecionar(area) {
            console.log(area);
            this.menuShow = false
            this.$emit('onSelect',area)
        }
    }
}
</script>
<style>
</style>