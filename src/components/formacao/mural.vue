<template>
    <div class="grid grid-cols-12">
        <div class="col-span-12 sm:col-span-6 pr-2 border">
            <geral :formacao="formacao" v-if="formacao != null" />
        </div>
        <div class="col-span-12 sm:col-span-6 pl-2">
            <div class="border rounded p-1 text-sm">
                <mural />
            </div>
        </div>
    </div>
</template>

<script>
import geral from "./geral.vue"
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import mural from "./mural/mural.vue"
import salaTool from '@/components/utils/salaTool'

export default {
    components: { geral, mural },
    props: {
        formacao: { default: null, type: Object },
        sala: { default: null, type: Object }
    },
    data() {
        return {
            inputCss: { outer: "flex-1", inner: 'h-7 text-[8pt] fw-700', help: "text-[6pt] mt-2" },
            mensagem: "",
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