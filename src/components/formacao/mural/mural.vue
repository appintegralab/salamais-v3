<template>

    <div class="border rounded p-1">
        <div class="fw-600 text-sm">
            Mural
        </div>
        <hr class="">
        <postForm v-if="isFacilitador" />
        <postlist />
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import postForm from "./post-form.vue"
import salaTool from '@/components/utils/salaTool'
import postlist from "./post-list.vue"

export default {
    components: { postForm, postlist },
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
    watch: {
        "$route.params.id": function () {
            this.load()
        },
    },
    mounted() {
        this.load()
    },
    computed: {
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