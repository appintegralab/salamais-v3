<template>
    <span :style="'background-color:' + area.cor"
        class="leading-3 ml-1 text-[6pt] fw-700 px-1 pt-[1px] rounded text-white">
        {{ area.sigla }}
        <q-tooltip class="" :delay="800">
            <div class="flex items-center justify-center">
                <div class="">
                    <span :style="'background-color:' + area.cor"
                        class="ml-1 text-[6pt] fw-700 px-1 pt-[1px] rounded text-white">
                        {{ area.sigla }}</span>
                </div>
                <div class="h-[12px] pl-1 text-[7pt] fw-700">
                    {{ area.nome }}
                </div>
            </div>
        </q-tooltip>
    </span>
</template>

<script>
import { rdb, snapToArray } from "@/firebase/firebase.js"
import { ref, onValue, set, get, orderByChild, query, equalTo } from "firebase/database"

export default {
    props: {
        sigla: { default: "", type: String }
    },
    data() {
        return {
            area: {
                sigla: "",
                cor: "#ffffff"
            }
        }
    },
    mounted() {
        let self = this
        let id = this.sigla
        console.log("id", id);
        get(ref(rdb, "/salamais/areas/"+id)).then((snap) => {
            let data = snap.val()
            self.area = data
            console.log("self.area", self.area);
        })
    },
    methods: {

    },
}
</script>
<style lang="">
    
</style>