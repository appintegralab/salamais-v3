<template>
    <div class="m-2 border rounded px-1">
        <div v-if="postList == null">
            <div class="p-2 border bg-gray-200 rounded fw-200">
                Mural vazio (nenhuma postagem criada)
            </div>
        </div>
        <div v-if="postList != null">
            <div class="my-1" v-for="(post,index) in postList" :key="index">
                <postVue :post="post" />
            </div>
        </div>
    </div>
</template>

<script>
import moment from 'moment/min/moment-with-locales'
import 'moment/locale/pt-br.js'
import { rdb } from "@/firebase/firebase.js"
import { ref, onValue, set } from "firebase/database"
import notif from "@/notif.js"
import { userStore } from "@/stores/user-store"
import salaTool from '@/components/utils/salaTool'
import postVue from './post.vue'

export default {
    components: { postVue },
    data() {
        return {
            postList: null,
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

                onValue(ref(rdb, "/salamais/postagens/" + salaTool.urlID), (snap) => {
                    self.postList = snap.val()
                    console.log("self.postList", self.postList);
                })
            })
        }
    },
}
</script>
<style lang="">
    
</style>