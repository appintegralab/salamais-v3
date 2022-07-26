<template>
    <div v-if="user != null">
        <div class="flex items-center p-1">
            <div class="">
                <q-avatar size="20px">
                    <q-img :src="user.urlFoto" />
                </q-avatar>
            </div>
            <div class="flex-1 ml-2 truncate">
                <div class="text-[7pt] fw-400 leading-3">
                    <span class="">{{ user.nome }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { rdb } from "@/firebase/firebase.js"
import { ref, get } from "firebase/database"

export default {
    props: {
        userID: { default: "noid", type: String }
    },
    data() {
        return {
            user: null
        }
    },
    watch: {
        userID() {
            this.load()
        }
    },
    mounted() {
        this.load()
    },
    methods: {
        load() {
            let self = this
            get(ref(rdb, "/salamais/usuarios/" + this.userID)).then((snap) => {
                let user = snap.val()
                if (user) {
                    self.user = user
                }
            })
        }
    },
}
</script>
<style lang="">
    
</style>